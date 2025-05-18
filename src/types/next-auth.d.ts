import "next-auth";
import { DefaultSession } from "next-auth";

// Memperluas tipe Session dengan menambahkan properti id dan role
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  // Memperluas tipe User dengan menambahkan properti role
  interface User {
    id: string;
    role: string;
  }
}

// Memperluas tipe JWT dengan menambahkan properti id dan role
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}