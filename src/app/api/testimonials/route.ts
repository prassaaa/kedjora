import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    
    const where = featured === 'true' ? { featured: true } : {};
    
    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [
        {
          featured: 'desc'
        },
        {
          createdAt: 'desc'
        }
      ],
    });
    
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Verifikasi autentikasi
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { name, position, company, content, rating, imageUrl, featured } = body;
    
    // Validasi data
    if (!name || !content || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Buat testimonial baru
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        position,
        company,
        content,
        rating,
        imageUrl,
        featured: featured || false,
      },
    });
    
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}