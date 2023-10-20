import { ReactNode } from "react";
import { Button } from "../ui/button";

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
