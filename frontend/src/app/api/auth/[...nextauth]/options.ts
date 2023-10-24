import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Backend_URL } from "@/lib/Constants";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
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
          console.log(res);
          return res.data;
        } else if (res.status === "error") {
          console.log(res);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      console.log("========={ token, user }");
      console.log({ token, user });
      console.log("========={ token, user }");
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = session.backendTokens;
      return session;
    },
  },
};

async function login(email: string, password: string) {
  // console.log("email: " + email);
  // console.log("password: " + password);
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
    // console.log("data: ");
    // console.log(data);
    return { status: "ok", data: data };
  } catch (error: any) {
    return { status: "error", msg: error.message };
  }
}
