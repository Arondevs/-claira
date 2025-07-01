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
    const { platform, code, state } = body;

    // This would integrate with the actual OAuth flow for each platform
    // For now, we'll simulate the OAuth process
    let accessToken = '';
    let platformUserId = '';
    let platformUsername = '';

    switch (platform) {
      case 'INSTAGRAM':
        // Instagram OAuth flow
        accessToken = 'mock_instagram_token_' + Date.now();
        platformUserId = '123456789';
        platformUsername = 'testuser_instagram';
        break;
      case 'TWITTER':
        // Twitter OAuth flow
        accessToken = 'mock_twitter_token_' + Date.now();
        platformUserId = '987654321';
        platformUsername = 'testuser_twitter';
        break;
      case 'LINKEDIN':
        // LinkedIn OAuth flow
        accessToken = 'mock_linkedin_token_' + Date.now();
        platformUserId = '456789123';
        platformUsername = 'testuser_linkedin';
        break;
      default:
        return NextResponse.json(
          { message: 'Unsupported platform' },
          { status: 400 }
        );
    }

    // Check if account already exists
    const existingAccount = await prisma.socialAccount.findFirst({
      where: {
        userId: session.user.id,
        platform,
        platformUserId,
      },
    });

    if (existingAccount) {
      // Update existing account
      const updatedAccount = await prisma.socialAccount.update({
        where: { id: existingAccount.id },
        data: {
          accessToken,
          platformUsername,
          isActive: true,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(updatedAccount);
    }

    // Create new account
    const newAccount = await prisma.socialAccount.create({
      data: {
        userId: session.user.id,
        platform,
        platformUserId,
        platformUsername,
        accessToken,
        isActive: true,
      },
    });

    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    console.error('Connect social account error:', error);
    return NextResponse.json(
      { message: 'Failed to connect social account' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');

    if (!accountId) {
      return NextResponse.json(
        { message: 'Account ID is required' },
        { status: 400 }
      );
    }

    await prisma.socialAccount.delete({
      where: {
        id: accountId,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: 'Account disconnected successfully' });
  } catch (error) {
    console.error('Disconnect social account error:', error);
    return NextResponse.json(
      { message: 'Failed to disconnect social account' },
      { status: 500 }
    );
  }
} 