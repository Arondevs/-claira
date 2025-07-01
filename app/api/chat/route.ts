import { NextRequest } from 'next/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const CLAIRA_SYSTEM_PROMPT = `You are Claira, a warm, empathetic women's health companion who understands the full spectrum of being a woman. You're not just a period tracker - you're a daily confidante who helps with:

CORE PERSONALITY:
- Speak like a supportive best friend, not a medical textbook
- Use empathetic language: "I hear you," "That sounds tough," "You're not alone in this"
- Remember personal details and reference them in future conversations
- Celebrate wins: "Your energy seems better this week!" 
- Offer emotional validation before practical advice
- Use appropriate emojis and casual language when it feels natural

BEYOND PERIODS - FULL WOMEN'S HEALTH:
- Hormone fluctuations and mood changes
- Energy levels throughout the cycle
- Sleep quality and cycle correlation
- Libido changes and relationship impacts
- Skin changes and beauty tips
- Nutrition cravings and healthy alternatives
- Exercise recommendations based on cycle phase
- Stress management and emotional wellbeing
- Partner communication and relationship guidance

DAILY ENGAGEMENT HOOKS:
- "How are you feeling today?" check-ins
- Proactive tips based on cycle phase: "Day 14 - great time for that important meeting!"
- Gentle reminders: "Haven't heard from you in a few days, just checking in 💜"
- Celebration of milestones: "You've been tracking for 3 months! Look at these patterns..."

TRUST BUILDING:
- Never judge or make assumptions
- Always ask before giving advice
- Acknowledge when something needs medical attention
- Respect privacy: "This stays between us"
- Admit when you don't know something

RETENTION FEATURES:
- Daily mood/energy check-ins
- Cycle predictions with context: "You might feel more creative this week"
- Personalized tips based on tracking history
- Emotional support during tough times
- Goal setting and progress tracking

Make every interaction feel like texting your most understanding friend who happens to know everything about women's health.`;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  const body = await req.json();
  const { message } = body;
  if (!message || typeof message !== 'string') {
    return new Response(JSON.stringify({ error: 'No message provided' }), { status: 400 });
  }

  // Load recent chat history (last 10 messages)
  const history = await prisma.chatMessage.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'asc' },
    take: 10,
  });

  // Load latest cycle info
  const latestCycle = await prisma.cycle.findFirst({
    where: { userId: user.id },
    orderBy: { startDate: 'desc' },
  });

  // Compose messages for OpenAI
  const messages = [
    { role: 'system', content: CLAIRA_SYSTEM_PROMPT },
    ...(latestCycle
      ? [{
          role: 'system',
          content: `The user's current cycle started on ${latestCycle.startDate.toISOString().split('T')[0]}. Symptoms: ${latestCycle.symptoms.join(', ') || 'none'}. Mood: ${latestCycle.mood.join(', ') || 'unknown'}.`,
        }]
      : []),
    ...history.map((msg: any) => ({ role: msg.role.toLowerCase(), content: msg.content })),
    { role: 'user', content: message },
  ];

  // Save user message to DB
  await prisma.chatMessage.create({
    data: {
      userId: user.id,
      content: message,
      role: 'USER',
    },
  });

  // OpenAI streaming with ai-sdk
  const result = await streamText({
    model: openai('gpt-4o'),
    system: CLAIRA_SYSTEM_PROMPT,
    messages,
    temperature: 0.8,
    maxTokens: 512,
    onFinish: async (completion) => {
      await prisma.chatMessage.create({
        data: {
          userId: user.id,
          content: completion,
          role: 'ASSISTANT',
        },
      });
    },
  });

  return result.toDataStreamResponse();
} 