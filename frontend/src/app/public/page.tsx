import { getServerSession } from "next-auth/next";
import type { NextRequest } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Protected(req: NextRequest): Promise<any> {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <div className="grid grid-cols-2 text-white p-4">
      <div>
        {session !== null ? (
          <h1 className="leading-loose text-[15rem] font-extrabold text-accent">
            Hi man!
          </h1>
        ) : (
          <a className="btn btn-primary" href="/api/auth/signin">
            Sign in
          </a>
        )}
      </div>
    </div>
  );
}
