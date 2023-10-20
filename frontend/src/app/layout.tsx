"use client";
import Navbar from "@/components/StarterComp/Navbar";
import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="bg-color-main w-screen h-screen">{children}</div>
      </body>
    </html>
  );
}
