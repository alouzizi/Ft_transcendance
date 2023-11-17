import "../styles/globals.css";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>


        <Theme>
          {children}
        </Theme>

      </body>
    </html>
  );
}



