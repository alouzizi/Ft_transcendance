"use client";
import { ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import NavBarProtected from "./NavBarProtected";
import NavBarPublic from "./NavbarPublic";
export default function NavBar(prompt: { children: ReactNode }) {
  const { data: session } = useSession();

  if (session && session.user) {
    return <NavBarProtected>{prompt.children}</NavBarProtected>;
  } else {
    return <NavBarPublic>{prompt.children}</NavBarPublic>;
  }
}
//   return (
//     <div className="flex flex-col">
//       <div className=" flex flex-row justify-items-start h-20 bg-color-main-dark z-30">
//         <div className="w-28 h-full  flex flex-col justify-center ">
//           <img className="h-3/4 m-auto" src="logo.png" alt="" />
//         </div>
//         <div className="flex flex-row justify-center p-2">
//           <div
//             onClick={() => {
//               setShow((prev) => !prev);
//               console.log(show + " click");
//               console.log(session);
//             }}
//             className="my-auto "
//           >
//             <FiMenu
//               className="my-auto w-8 h-8 text-gray-400 cursor-pointer
//         hover:text-white

//         // small screen
//        block
//         // Big screen
//         2xl:hidden
//         "
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-row w-screen bg-color-main relative">
//         <div
//           className={`
//        absolute  top-0 z-20
//        transition-all duration-300 ease-in-out overflow-hidden
//        ${show ? "left-0" : "-left-full"}

//        2xl:left-0

//        `}
//         >
//           <SideBar />
//         </div>
//         <div
//           className={` w-screen  m-0 bg-color-main
//        transition-all duration-300 ease-in-out overflow-hidden
//          min-[0px]:pl-0
//         ${show ? "md:pl-32" : "md:pl-0"}
//         2xl:pl-20
//         `}
//         >
//           {prompt.children}
//         </div>
//       </div>
//     </div>
//   );
// }
