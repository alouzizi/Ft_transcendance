export { default } from "next-auth/middleware";
// export const config = { matcher: ["/login"] };

import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

// export default withAuth(function middleware(req) {}, {
//   callbacks: {
//     authorized: ({ req, token }) => {
//       console.log("========+========");
//       console.log({ req: req.nextUrl.pathname.startsWith("/") });
//       console.log({ token: token });
//       console.log("========-========");
//       //   return false;
//       if (req.nextUrl.pathname.startsWith("/") && token === null) {
//         return false;
//       }
//       return true;
//     },
//   },
// });
