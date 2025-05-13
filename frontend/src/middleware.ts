import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIES } from "./types";
import { routes } from "./config/routes";
import { USER_ROLE } from "./enums";

export const PUBLIC_PATHS = [
  "/",
  "/signin",
  "/signup",
  "/galleries",
  "/artworks",
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get(COOKIES.AUTH_TOKEN)?.value;

  const userType = request.cookies.get(COOKIES.USER_ROLE)?.value || "";

  const Redirect = () => {
    if (token) {
      switch (userType) {
        case USER_ROLE.ARTIST:
          return NextResponse.redirect(
            new URL(routes.artist.dashboard, request.url)
          );
        case USER_ROLE.CURATOR:
          return NextResponse.redirect(
            new URL(routes.curator.dashboard, request.url)
          );
      }
    }
    return NextResponse.redirect(new URL(routes.signIn, request.url));
  };

  if (path === "/") {
    return Redirect();
  }

  // Skip middleware for static/public files
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from signin/signup
  if (token && (path === routes.signIn || path === routes.signUp)) {
    return Redirect();
  }

  // Require auth for artist/curator protected pages
  const isProtected = path.startsWith("/artist") || path.startsWith("/curator");

  if (isProtected) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = routes.signIn;
      return NextResponse.redirect(url);
    }

    // Prevent ARTIST from accessing curator pages
    if (path.startsWith("/curator") && userType === USER_ROLE.ARTIST) {
      return NextResponse.redirect(
        new URL(routes.artist.dashboard, request.url)
      );
    }

    // Prevent CURATOR from accessing artist pages
    if (path.startsWith("/artist") && userType === USER_ROLE.CURATOR) {
      return NextResponse.redirect(
        new URL(routes.curator.dashboard, request.url)
      );
    }
  }

  return NextResponse.next();
}
