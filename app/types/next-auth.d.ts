import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User and Session interfaces
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "SUPER_ADMIN" | "ADMIN" | "SALES_MANAGER";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: "SUPER_ADMIN" | "ADMIN" | "SALES_MANAGER";
  }
}

// Extend JWT to include role
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "SUPER_ADMIN" | "ADMIN" | "SALES_MANAGER";
  }
}
