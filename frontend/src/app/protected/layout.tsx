"use client";
import "../../styles/globals.css";
import NavBarProtected from "@/app/components/navBar/NavBarProtected";
import { GlobalContextProvider } from "./context/store";

export default function ProtectedLayout(prompt: { children: React.ReactNode }) {
  return (
    <GlobalContextProvider>
      <NavBarProtected>{prompt.children}</NavBarProtected>
    </GlobalContextProvider>
  );
}
