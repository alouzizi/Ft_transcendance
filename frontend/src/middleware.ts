import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const hasToken = request.cookies.has("access_token");
  const hasIntra_id = request.cookies.has("intra_id");

  if (!hasToken && !hasIntra_id) {
    return NextResponse.redirect(new URL(`/public/HomePage`, request.nextUrl));
  }
}
export const config = {
  matcher: "/protected/:path*",
};
