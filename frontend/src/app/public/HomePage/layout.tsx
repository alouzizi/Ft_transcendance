"use client";


export default function AuthLayout(prompt: { children: React.ReactNode }) {
  return (
    <div className="bg-color-main h-full">
      {prompt.children}
    </div>

  );
}