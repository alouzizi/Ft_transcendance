import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    };
    backendTokens: {
      access_token: string;
      refresh_token: string;
      expiresIn: number;
    };
  }
}

import { JWT } from "next-auth";
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    };
    backendTokens: {
      access_token: string;
      refresh_token: string;
      expiresIn: number;
    };
  }
}
