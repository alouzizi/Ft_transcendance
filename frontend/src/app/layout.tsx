import "../styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "./context/providers";
import "@radix-ui/themes/styles.css";
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
        <Providers>
          <GlobalContextProvider>
            <Theme className=" bg-[#151b2d] text-white">{children}</Theme>
          </GlobalContextProvider>
        </Providers>
      </body>
    </html>
  );
}
