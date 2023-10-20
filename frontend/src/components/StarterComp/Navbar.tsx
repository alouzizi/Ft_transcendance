"use client";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Laugh } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="w-full bg-color-main-dark flex flex-row justify-center py-4">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Laugh size={32} />
        </Link>
        <Link
          href="/login"
          className={buttonVariants({
            variant: "outline",
            className: "text-color-main bg-color-main-whith",
          })}
        >
          Login
        </Link>
      </div>
      {/* <button
        className="mx-auto mt-4 px-4 py-2 rounded-md bg-color-main-whith text-white "
        type="submit"
        onClick={() => {
          router.push("(auth)/login");
        }}
      >
        login
      </button> */}
    </div>
  );
}
