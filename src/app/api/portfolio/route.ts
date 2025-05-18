import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    
    const where = featured === 'true' ? { featured: true } : {};
    
    const portfolios = await prisma.portfolio.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolios' },
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
    const { title, slug, description, clientName, serviceType, imageUrls, technologies, demoUrl, featured } = body;
    
    // Validasi data
    if (!title || !slug || !description || !serviceType || !imageUrls || !technologies) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Cek apakah slug sudah digunakan
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { slug },
    });
    
    if (existingPortfolio) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }
    
    // Buat portfolio baru
    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        slug,
        description,
        clientName,
        serviceType,
        imageUrls,
        technologies,
        demoUrl,
        featured: featured || false,
      },
    });
    
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error creating portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio' },
      { status: 500 }
    );
  }
}