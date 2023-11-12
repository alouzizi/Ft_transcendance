import "../styles/globals.css";
import { Inter } from "next/font/google";
<<<<<<< HEAD
import Providers from "./context/providers";
import "@radix-ui/themes/styles.css";
=======
import '@radix-ui/themes/styles.css';
>>>>>>> implement the sockets successfully
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
<<<<<<< HEAD
      <body className={inter.className}>
        <Providers>
          <GlobalContextProvider>
            <Theme className=" bg-[#151b2d] text-white">{children}</Theme>
          </GlobalContextProvider>
        </Providers>
=======
      <body className={`${inter.className} text-white`}>
        <GlobalContextProvider>
          {/*  className=' bg-[#151b2d]' */}
          <Theme>
            {children}
          </Theme>
        </GlobalContextProvider>
>>>>>>> implement the sockets successfully
      </body>
    </html>
  );
}
<<<<<<< HEAD
=======



>>>>>>> implement the sockets successfully
