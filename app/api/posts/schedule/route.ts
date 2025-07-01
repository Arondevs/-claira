import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { postId, scheduledAt, platforms } = body;

    // Update the post with scheduled time
    const updatedPost = await prisma.post.update({
      where: { id: postId, userId: session.user.id },
      data: {
        scheduledAt: new Date(scheduledAt),
        status: 'SCHEDULED',
      },
    });

    // Create scheduled jobs for each platform
    // This would integrate with your job queue system (e.g., Bull, Agenda)
    for (const platform of platforms) {
      // Add to job queue for processing at scheduled time
      console.log(`Scheduling post ${postId} for ${platform} at ${scheduledAt}`);
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Schedule post error:', error);
    return NextResponse.json(
      { message: 'Failed to schedule post' },
      { status: 500 }
    );
  }
} 