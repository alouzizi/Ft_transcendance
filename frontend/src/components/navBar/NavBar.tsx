"use client";
import { FiMenu } from "react-icons/fi";
export default function NavBar(){
    // const menuHandler = ()=>{
    //     document.getElementById("SideBar")?.style.display = "block"
    // }ffffß
return(
    <div className=" flex flex-row justify-items-start h-20 bg-color-main-dark">
         <div className="w-28 h-full  flex flex-col justify-center ">
         <img className="h-3/4 m-auto" src="logo.png" alt="" />
         </div>
         <div className="flex flex-row justify-center p-2">

        <div onClick={()=>{console.log("hello")}}>
        <FiMenu className="my-auto w-8 h-8 text-gray-400 cursor-pointer
        hover:text-white "/>
        </div>
         </div>
    </div>
);
}