import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
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
    const { title, slug, description, features, price, imageUrl, isPopular, isActive } = body;
    
    // Validasi data
    if (!title || !slug || !description || !features) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Cek apakah slug sudah digunakan
    const existingService = await prisma.service.findUnique({
      where: { slug },
    });
    
    if (existingService) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }
    
    // Buat service baru
    const service = await prisma.service.create({
      data: {
        title,
        slug,
        description,
        features, // JSON string dari array features
        price,
        imageUrl,
        isPopular: isPopular || false,
        isActive: isActive || true,
      },
    });
    
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}