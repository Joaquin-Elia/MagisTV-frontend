import { NextResponse } from "next/server";
import { getUserMeLoader } from "./app/data/services/get-user-me-loader";

export async function middleware(NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = NextRequest.nextUrl.pathname;

  if (currentPath.startsWith("/dashboard") && user.ok === false) {
    return NextResponse.redirect(new URL("/sign-in", NextRequest.url));
  }

  else if (currentPath.startsWith("/sign-in") && user.ok === true) {
    return NextResponse.redirect(new URL("/dashboard", NextRequest.url));
  }

  return NextResponse.next();
}