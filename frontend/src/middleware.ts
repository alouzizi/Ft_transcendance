// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { Backend_URL } from './lib/Constants';
// import axios from 'axios';

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     // 
//     const hasToken = request.cookies.has("access_token");
//     const hasIntra_id = request.cookies.has("intra_id");


//     if (request.cookies.get("intra_id") && request.cookies.get("access_token")) {
//         const token = request.cookies.get("access_tokesn")?.value;
//         const id_intra = request.cookies.get("intra_id")?.value;
//         const res = await axios.get(Backend_URL + `/auth/checkTockenIsValide/${id_intra}`,
//             {
//                 headers: {
//                     authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//         const dat = await res.data;
//         console.log("datatata -> ", dat);
//     } else {
//         return NextResponse.redirect(new URL(`/auth`, request.nextUrl));
//     }

//     // if (hasToken && hasIntra_id) {
//     //     
//     // }

// }

// export const config = {
//     matcher: '/protected/:path*',
// }