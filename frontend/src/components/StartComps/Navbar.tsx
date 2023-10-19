"use client";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function Navbar() {
  return (
    <div className="w-full fixed">
      <div className="container ">
        <Link href="/">Logo</Link>
        <button
          className="mx-auto mt-4 px-4 py-2 rounded-md bg-color-main-whith text-white "
          type="submit"
          onClick={() => {}}
        >
          login
        </button>
      </div>
    </div>
  );
}
