import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createPostSchema = z.object({
  content: z.string().min(1).max(2200),
  platforms: z.array(z.enum(['INSTAGRAM', 'TWITTER', 'LINKEDIN', 'TIKTOK', 'FACEBOOK'])),
  images: z.array(z.string()).optional(),
  scheduledAt: z.string().transform(str => str ? new Date(str) : null).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    console.log('Session details:', {
      user: session?.user,
      email: session?.user?.email,
      id: session?.user?.id
    })
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the user by email to get the correct ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    console.log('Database user found:', user)

    if (!user) {
      // Let's also check what users exist in the database
      const allUsers = await prisma.user.findMany({
        select: { id: true, email: true, name: true }
      })
      console.log('All users in database:', allUsers)
      
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
    }

    const body = await request.json()
    console.log('Received post data:', { ...body, content: body.content?.substring(0, 100) + '...' })
    
    const validatedData = createPostSchema.parse(body)
    console.log('Validated data:', { ...validatedData, content: validatedData.content.substring(0, 100) + '...' })

    const post = await prisma.post.create({
      data: {
        content: validatedData.content,
        platforms: validatedData.platforms,
        images: validatedData.images || [],
        scheduledAt: validatedData.scheduledAt,
        status: validatedData.scheduledAt ? 'SCHEDULED' : 'DRAFT',
        userId: user.id, // Use the correct user ID from database
      },
    })

    console.log('Post created successfully:', post.id)
    return NextResponse.json({ success: true, post })
  } catch (error) {
    console.error('Create post error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    })
    return NextResponse.json({ 
      error: `Database error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    console.log('GET - Session details:', {
      user: session?.user,
      email: session?.user?.email,
      id: session?.user?.id
    })
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the user by email to get the correct ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    console.log('GET - Database user found:', user)

    if (!user) {
      // Let's also check what users exist in the database
      const allUsers = await prisma.user.findMany({
        select: { id: true, email: true, name: true }
      })
      console.log('GET - All users in database:', allUsers)
      
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
    }

    const posts = await prisma.post.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Get posts error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    })
    return NextResponse.json({ 
      error: `Database error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 })
  }
} 