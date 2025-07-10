import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const currentPath = nextUrl.pathname;

  const sessionCookie = getSessionCookie(req);
  const isAuthenticated = !!sessionCookie;

  if (!isAuthenticated && currentPath !== "/auth/signin") {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (currentPath === "/auth/signin" && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
