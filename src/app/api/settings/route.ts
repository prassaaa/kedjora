import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    
    const query = section ? { where: { section } } : {};
    
    const settings = await prisma.pageContent.findMany({
      ...query,
      orderBy: {
        section: 'asc',
      },
    });
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
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
    const { section, title, subtitle, content, imageUrl, buttonText, buttonLink } = body;
    
    // Validasi data
    if (!section) {
      return NextResponse.json(
        { error: 'Section is required' },
        { status: 400 }
      );
    }
    
    // Cek apakah section sudah ada
    const existingSection = await prisma.pageContent.findUnique({
      where: { section },
    });
    
    let pageContent;
    
    if (existingSection) {
      // Update jika sudah ada
      pageContent = await prisma.pageContent.update({
        where: { section },
        data: {
          title,
          subtitle,
          content,
          imageUrl,
          buttonText,
          buttonLink,
        },
      });
    } else {
      // Buat baru jika belum ada
      pageContent = await prisma.pageContent.create({
        data: {
          section,
          title,
          subtitle,
          content,
          imageUrl,
          buttonText,
          buttonLink,
        },
      });
    }
    
    return NextResponse.json(pageContent);
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}