import { NextRequest, NextResponse } from "next/server";
import { languages, cookieName } from "./app/i18n/settings";
import acceptLanguage from "accept-language";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

export function middleware(req: NextRequest) {
  let lng;

  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies?.get(cookieName)?.value);
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  }
  if (!lng) {
  }

  const redirectRules = {
    default: !languages.some((loc) =>
      req.nextUrl.pathname.startsWith(`/${loc}`)
    ),
    notBuild: !req.nextUrl.pathname.startsWith("/_next"),
    notSeoTools:
      req.nextUrl.pathname !== "/favicon.ico" &&
      req.nextUrl.pathname !== "/robots.txt" &&
      !req.nextUrl.pathname.includes("sitemap"),
  };

  // Redirect if redirect rules in path is not supported
  if (
    redirectRules.default &&
    redirectRules.notBuild &&
    redirectRules.notSeoTools
  ) {
    return NextResponse.redirect(
      new URL(
        `/${lng}${req.nextUrl.pathname}${
          req.nextUrl.searchParams ? `?${req.nextUrl.searchParams}` : ""
        }`,
        req.url
      )
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") as string);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );

    const response = NextResponse.next();

    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
    }

    return response;
  }

  return NextResponse.next();
}
