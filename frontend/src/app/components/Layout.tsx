// "use client";

// import { useEffect } from "react";
// import { useGlobalContext } from "../context/store";
// import NavBarProtected from "./navBar/NavBarProtected";
// import NavBarPublic from "./navBar/NavbarPublic";

// const Layout = ({
//     children,
// }: {
//     children: React.ReactNode;
// }) => {

//     const { isAuthenticated, user } = useGlobalContext();

//     useEffect(() => {
//         console.log("======>", user.id, isAuthenticated);
//     },
//         [user.id, isAuthenticated])
//     return (
//         <div>

//             {!isAuthenticated
//                 ?
//                 <NavBarPublic>
//                     {children}
//                 </NavBarPublic>
//                 :
//                 <NavBarProtected>
//                     {children}
//                 </NavBarProtected>
//             }

//         </div>
//     );
// };

// export default Layout;
