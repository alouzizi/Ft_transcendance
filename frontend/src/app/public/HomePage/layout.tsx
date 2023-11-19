"use client";

import NavBarPublic from "@/app/components/navBar/NavbarPublic";

export default function AuthLayout(prompt: { children: React.ReactNode }) {
  return (
    <div className="bg-color-main w-screen flex justify-center items-center h-screen py-16">
      {prompt.children}
    </div>

  );
}
