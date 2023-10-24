"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers(prompt: { children: ReactNode }) {
  return <SessionProvider>{prompt.children}</SessionProvider>;
}
