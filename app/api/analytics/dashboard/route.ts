import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get dashboard stats
    const [
      totalPosts,
      scheduledPosts,
      publishedPosts,
      totalEngagement,
      connectedAccounts,
    ] = await Promise.all([
      prisma.post.count({ where: { userId: session.user.id } }),
      prisma.post.count({ 
        where: { 
          userId: session.user.id,
          status: 'SCHEDULED'
        }
      }),
      prisma.post.count({ 
        where: { 
          userId: session.user.id,
          status: 'PUBLISHED'
        }
      }),
      prisma.analytics.aggregate({
        where: { userId: session.user.id },
        _sum: { value: true }
      }),
      prisma.socialAccount.count({ 
        where: { 
          userId: session.user.id,
          isActive: true
        }
      }),
    ]);

    // Get recent posts
    const recentPosts = await prisma.post.findMany({
      where: { userId: session.user.id },
      include: { socialAccount: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Get platform breakdown
    const platformStats = await prisma.post.groupBy({
      by: ['platform'],
      where: { userId: session.user.id },
      _count: { id: true },
    });

    return NextResponse.json({
      stats: {
        totalPosts,
        scheduledPosts,
        publishedPosts,
        totalEngagement: totalEngagement._sum.value || 0,
        connectedAccounts,
      },
      recentPosts,
      platformStats,
    });
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch dashboard analytics' },
      { status: 500 }
    );
  }
} 