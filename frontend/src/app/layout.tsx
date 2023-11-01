import "../styles/globals.css";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";
import { GlobalContextProvider } from "./context/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <Theme className=' bg-[#151b2d]'>
            {children}
          </Theme>
        </GlobalContextProvider>
      </body>
    </html>
  );
}



