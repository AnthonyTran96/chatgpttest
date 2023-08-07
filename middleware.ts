export { default } from 'next-auth/middleware';

// export function middleware(request: Request) {
//     console.log(request.url);
// }

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|auth/signIn|_next/static|_next/image|favicon.ico|images).*)',
    ],
};
