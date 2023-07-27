// middleware.ts
import { NextResponse } from "next/server";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./src/components/Routes";

export const middleware = (request: any) => {
  const token = request.cookies.get("accessToken")?.value;
  if (PRIVATE_ROUTES.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //   if (PUBLIC_ROUTES.includes(request.nextUrl.pathname) && token) {
  //     return NextResponse.redirect(new URL("/dashboard" || "", request.url));
  //   }

  return NextResponse.next();
};
