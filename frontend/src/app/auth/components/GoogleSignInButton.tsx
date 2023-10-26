import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function GoogleSignInButton(prompt: { children: ReactNode }) {
  const loginWithGoogle = () => {
    console.log("login with google");
  };
  return (
    <Button className="w-full" onClick={loginWithGoogle} type="button">
      {prompt.children}
    </Button>
  );
}
