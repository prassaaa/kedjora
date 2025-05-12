import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: params.id },
    });
    
    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    if (!title || !description || !serviceType || !imageUrls || !technologies) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Cek apakah slug sudah digunakan oleh portfolio lain
    if (slug) {
      const existingPortfolio = await prisma.portfolio.findFirst({
        where: { 
          slug,
          id: { not: params.id }
        },
      });
      
      if (existingPortfolio) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }
    
    // Update portfolio
    const portfolio = await prisma.portfolio.update({
      where: { id: params.id },
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
    console.error('Error updating portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verifikasi autentikasi
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Hapus portfolio
    await prisma.portfolio.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio' },
      { status: 500 }
    );
  }
}