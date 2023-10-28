import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Backend_URL } from "@/lib/Constants";
import { AuthOptions } from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      Authorization: `Refresh ${token.backendTokens.refresh_token}`,
    },
  });

  const response = await res.json();
  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    FortyTwoProvider({
      clientId: 'u-s4t2ud-7527be8cdb9352288351be959fdbe96d939875e2c2b8cb6f649886e3b5799f4c',
      clientSecret: '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'
    }),

    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const res = await login(credentials.email, credentials.password);
        if (res.status === "ok") {
          return res.data;
        } else if (res.status === "error") {
          return null;
        }
      },
    }),


  ],

  session: { strategy: "jwt" },

  callbacks: {


    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      if (new Date().getTime() < token.backendTokens.expiresIn) {
        return token;
      }
      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = session.backendTokens;
      return session;
    },
  },
};

async function login(email: string, password: string) {
  try {
    const response = await fetch(`${Backend_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    if (data.statusCode >= 400) {
      return { status: "error", msg: data.message[0] };
    }
    return { status: "ok", data: data };
  } catch (error: any) {
    return { status: "error", msg: error.message };
  }
}
