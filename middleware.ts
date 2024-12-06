import { NextResponse } from "next/server";
import { authMiddleware } from "./src/libs/routes";

export const config = {
  matcher: "/api/:path*",
};
export default async function middleware(req: Request) {
  console.log("Middleware called");
  const checks = await authMiddleware(req);
  if (!checks.isvalid && req.url.includes("/api/users")) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  return NextResponse.next();
}
