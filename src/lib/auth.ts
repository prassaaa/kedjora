// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // Gunakan PrismaAdapter tetapi tangani masalah tipe secara eksplisit
  // @ts-expect-error - PrismaAdapter memiliki tipe yang tidak kompatibel dengan NextAuthOptions
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Credentials tidak lengkap");
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          if (!user) {
            console.log("User tidak ditemukan:", credentials.email);
            return null;
          }

          const isValidPassword = await compare(
            credentials.password,
            user.password
          );

          console.log("Password valid:", isValidPassword);

          if (!isValidPassword) {
            return null;
          }

          // Pastikan mengembalikan objek user dengan struktur yang diharapkan
          return {
            id: user.id,
            name: user.name || "Admin",
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Error saat autentikasi:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        }
      };
    }
  },
  debug: process.env.NODE_ENV === "development", // Tambahkan logging untuk debugging
};