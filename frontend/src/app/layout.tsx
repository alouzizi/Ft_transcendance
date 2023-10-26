import "../styles/globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/navBar/NavBar";
import Providers from "./context/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar> {children}</NavBar>
        </Providers>
      </body>
    </html>
  );
}
