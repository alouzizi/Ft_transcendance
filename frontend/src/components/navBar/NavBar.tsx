"use client";
import { FiMenu } from "react-icons/fi";
export default function NavBar(prompt:{
    onClick: ()=>void
}){
   
return(
    <div className=" flex flex-row justify-items-start h-20 bg-color-main-dark">
         <div className="w-28 h-full  flex flex-col justify-center ">
         <img className="h-3/4 m-auto" src="logo.png" alt="" />
         </div>
         <div className="flex flex-row justify-center p-2">

        <div onClick={prompt.onClick} className="my-auto">
        <FiMenu className="my-auto w-8 h-8 text-gray-400 cursor-pointer
        hover:text-white 
        
        // small screen
       block
        // Big screen
        2xl:hidden
        "/>
        </div>
         </div>
    </div>
);
}