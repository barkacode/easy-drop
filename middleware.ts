import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const currentPath = nextUrl.pathname;

  const sessionCookie = getSessionCookie(req);
  const isAuthenticated = !!sessionCookie;

  const isAuthPage = currentPath.startsWith("/auth");
  const isPublicPage =
    currentPath.startsWith("/_next") ||
    currentPath.startsWith("/favicon.ico") ||
    currentPath.startsWith("/api/public");

  // ✅ Redirige un utilisateur connecté hors de la page de connexion
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Laisse passer les pages publiques ou les ressources statiques
  if (isPublicPage) {
    return NextResponse.next();
  }

  

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
