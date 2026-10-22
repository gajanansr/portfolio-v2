import { NextResponse, type NextRequest } from "next/server";

// app-designs.gajananrathod.in serves the static site in public/app-designs.
// On the main domain the same site lives at /app-designs/.
// next.config.mjs sets skipTrailingSlashRedirect, so trailing slashes are handled here.
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const { pathname, search } = new URL(req.url);
  const to = (path: string) => new URL(path + search, req.url);

  if (host.startsWith("app-designs.")) {
    if (pathname.startsWith("/app-designs/")) return NextResponse.next();
    return NextResponse.rewrite(
      to(
        pathname === "/" ? "/app-designs/index.html" : `/app-designs${pathname}`
      )
    );
  }

  if (pathname === "/app-designs")
    return NextResponse.redirect(to("/app-designs/"), 308);
  if (pathname === "/app-designs/")
    return NextResponse.rewrite(to("/app-designs/index.html"));
  if (
    pathname.length > 1 &&
    pathname.endsWith("/") &&
    !pathname.startsWith("/app-designs/")
  ) {
    return NextResponse.redirect(to(pathname.replace(/\/+$/, "")), 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico).*)"],
};
