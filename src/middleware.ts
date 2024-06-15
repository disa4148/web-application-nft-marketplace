import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ru'];
const publicPages = ['/', '/signin', '/signup', '/messenger', '/favorites'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'ru'
});

export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  let isSignedIn = false;

  const accessToken = req.cookies.get('accessToken');
  isSignedIn = accessToken ? true : false;

  if (isPublicPage || isSignedIn) {
    return await intlMiddleware(req);
  } else {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
