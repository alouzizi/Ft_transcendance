import "../styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "./context/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " text-white"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
