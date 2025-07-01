import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test user
  const hashedPassword = await hash('password123', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'test@claira.com' },
    update: {},
    create: {
      email: 'test@claira.com',
      name: 'Test User',
      password: hashedPassword,
      emailVerified: new Date(),
    },
  });

  console.log('✅ Created test user:', user.email);

  // Create social accounts
  const socialAccounts = await Promise.all([
    prisma.socialAccount.upsert({
      where: {
        userId_platform_platformUserId: {
          userId: user.id,
          platform: 'INSTAGRAM',
          platformUserId: '123456789',
        },
      },
      update: {},
      create: {
        userId: user.id,
        platform: 'INSTAGRAM',
        platformUserId: '123456789',
        platformUsername: 'testuser_instagram',
        accessToken: 'mock_access_token_instagram',
        isActive: true,
      },
    }),
    prisma.socialAccount.upsert({
      where: {
        userId_platform_platformUserId: {
          userId: user.id,
          platform: 'TWITTER',
          platformUserId: '987654321',
        },
      },
      update: {},
      create: {
        userId: user.id,
        platform: 'TWITTER',
        platformUserId: '987654321',
        platformUsername: 'testuser_twitter',
        accessToken: 'mock_access_token_twitter',
        isActive: true,
      },
    }),
    prisma.socialAccount.upsert({
      where: {
        userId_platform_platformUserId: {
          userId: user.id,
          platform: 'LINKEDIN',
          platformUserId: '456789123',
        },
      },
      update: {},
      create: {
        userId: user.id,
        platform: 'LINKEDIN',
        platformUserId: '456789123',
        platformUsername: 'testuser_linkedin',
        accessToken: 'mock_access_token_linkedin',
        isActive: true,
      },
    }),
  ]);

  console.log('✅ Created social accounts:', socialAccounts.length);

  // Create sample posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        userId: user.id,
        socialAccountId: socialAccounts[0].id,
        content: 'Just launched our new product! 🚀 Check it out and let us know what you think. #launch #product #innovation',
        mediaUrls: ['https://example.com/image1.jpg'],
        platform: 'INSTAGRAM',
        status: 'PUBLISHED',
        publishedAt: new Date(Date.now() - 86400000), // 1 day ago
        engagement: 245,
      },
    }),
    prisma.post.create({
      data: {
        userId: user.id,
        socialAccountId: socialAccounts[1].id,
        content: 'Excited to share some insights from our latest research on social media trends. The data shows some fascinating patterns! 📊 #socialmedia #research #trends',
        mediaUrls: [],
        platform: 'TWITTER',
        status: 'SCHEDULED',
        scheduledAt: new Date(Date.now() + 3600000), // 1 hour from now
        engagement: 0,
      },
    }),
    prisma.post.create({
      data: {
        userId: user.id,
        socialAccountId: socialAccounts[2].id,
        content: 'We\'re hiring! Looking for talented developers to join our team. If you\'re passionate about building great products, we\'d love to hear from you. #hiring #jobs #tech',
        mediaUrls: ['https://example.com/careers.jpg'],
        platform: 'LINKEDIN',
        status: 'DRAFT',
        engagement: 0,
      },
    }),
    prisma.post.create({
      data: {
        userId: user.id,
        socialAccountId: socialAccounts[0].id,
        content: 'Behind the scenes: Our team working hard to bring you the best features! 💪 #behindthescenes #team #work',
        mediaUrls: ['https://example.com/team.jpg', 'https://example.com/office.jpg'],
        platform: 'INSTAGRAM',
        status: 'PUBLISHED',
        publishedAt: new Date(Date.now() - 172800000), // 2 days ago
        engagement: 189,
      },
    }),
  ]);

  console.log('✅ Created sample posts:', posts.length);

  // Create analytics data
  const analytics = await Promise.all([
    prisma.analytics.create({
      data: {
        userId: user.id,
        postId: posts[0].id,
        metric: 'likes',
        value: 156,
        platform: 'INSTAGRAM',
        date: new Date(Date.now() - 86400000),
      },
    }),
    prisma.analytics.create({
      data: {
        userId: user.id,
        postId: posts[0].id,
        metric: 'comments',
        value: 23,
        platform: 'INSTAGRAM',
        date: new Date(Date.now() - 86400000),
      },
    }),
    prisma.analytics.create({
      data: {
        userId: user.id,
        postId: posts[0].id,
        metric: 'shares',
        value: 12,
        platform: 'INSTAGRAM',
        date: new Date(Date.now() - 86400000),
      },
    }),
    prisma.analytics.create({
      data: {
        userId: user.id,
        postId: posts[3].id,
        metric: 'likes',
        value: 134,
        platform: 'INSTAGRAM',
        date: new Date(Date.now() - 172800000),
      },
    }),
    prisma.analytics.create({
      data: {
        userId: user.id,
        postId: posts[3].id,
        metric: 'comments',
        value: 18,
        platform: 'INSTAGRAM',
        date: new Date(Date.now() - 172800000),
      },
    }),
  ]);

  console.log('✅ Created analytics data:', analytics.length);

  // Create subscription
  const subscription = await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      plan: 'PRO',
      status: 'ACTIVE',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  console.log('✅ Created subscription:', subscription.plan);

  // Create team
  const team = await prisma.team.create({
    data: {
      name: 'Claira Team',
      description: 'Our main team for managing women\'s health content',
    },
  });

  // Add user to team
  await prisma.teamMember.create({
    data: {
      userId: user.id,
      teamId: team.id,
      role: 'OWNER',
    },
  });

  console.log('✅ Created team and added user as owner');

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📋 Test Account Details:');
  console.log('Email: test@claira.com');
  console.log('Password: password123');
  console.log('\n🔗 Login at: http://localhost:3000/login');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 