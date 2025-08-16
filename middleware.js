// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req) {
//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET || 'یک_رشته_ایمن_طولانی',
//   });

//   const { pathname } = req.nextUrl;

//   // محافظت از /products
//   if (pathname.startsWith('/products') && !token) {
//     const url = req.nextUrl.clone();
//     url.pathname = '/signin';
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/products/:path*'], // شامل تمام مسیرها در /products
// };
