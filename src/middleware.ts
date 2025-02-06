import { NextResponse } from "next/server";

export function middleware() {
  // This part of the test was not clear in what is the purpose, but i know how to work with middleware
  return NextResponse.next();
}

export const config = {
  matcher: "/posts",
};
