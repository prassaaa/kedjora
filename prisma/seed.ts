import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Periksa apakah user admin sudah ada
    const adminExists = await prisma.user.findFirst({
      where: {
        email: 'admin@example.com',
      },
    });

    if (!adminExists) {
      // Buat user admin jika belum ada
      const hashedPassword = await hash('Admin123!', 10);
      
      const admin = await prisma.user.create({
        data: {
          name: 'Admin',
          email: 'admin@example.com',
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
      
      console.log('Admin user created:', admin);
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

main()
  .catch((e) => {
    console.error('Error in seed script:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seed completed, disconnecting Prisma');
    await prisma.$disconnect();
  });