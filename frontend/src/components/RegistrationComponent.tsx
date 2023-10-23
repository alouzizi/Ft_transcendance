"use client";

import Link from "next/link";

// function RegistrationComponent() {

//   // const handleRegister42 = () => {
//   //  console.log("ffff");
//   // };

//   return (
//     <div className="w-[380px] h-[434px] border-[1px] border-black rounded-[17px] p-[20px]" >
//       <div className="py-[50px] flex justify-center">
//         <Link href="127.0.0.1:3000/auth/login42">
//         <button onClick={() => {}} className='flex justify-center items-center gap-x-[10px] font-bold h-[42px] w-[122px] border-[1px] border-[#4069FF] rounded-[12px]'>
//           <img className='w-[29px]' src="/42.svg"/>
//           School
//         </button>
//         </Link>
//       </div>

//       <div className="text-[14px] py-[30px]">
//         <div className="flex flex-col gap-[20px] items-center">
//           <div className="flex justify-between w-full">
//             <input className="w-[160px] h-[35px] border-[1px] border-black rounded-[5px] pl-[10px]" placeholder="First Name" />
//             <input className="w-[160px] h-[35px] border-[1px] border-black rounded-[5px] pl-[10px]" placeholder="Last Name" />
//           </div>
//           <input className="w-full h-[35px] border-[1px] border-black rounded-[5px] pl-[10px]" placeholder="Enter Email" />
//           <input className="w-full h-[35px] border-[1px] border-black rounded-[5px] pl-[10px]"  placeholder="Enter Password" />
//           <button className="h-[50px] w-[180px] bg-[#4069FF] rounded-[8px] text-[white] text-[16px] font-[700]">Create</button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default RegistrationComponent;

const RegistrationComponent = () => {
  return (
    <>
      <div className="min-w-[400px] border border-black rounded-2xl flex flex-col items-center h-1/3 w-1/3 pt-10 gap-14">
     <button className="border border-blue-500 rounded-xl flex justify-center mx-auto items-center w-28 h-10">
        <img className='w-[29px]' src="/42.svg"/>
          school
        </button>
        <div className="flex flex-row w-full justify-around items-center mt-[-20px]">
          <div className="border border-gray-300 w-[30%] h-[1px] mr-[-70px]"></div>
            <p className="text-gray-400">OR</p>
          <div className="border border-gray-300 w-[30%] h-[1px] ml-[-70px]"></div>
        </div>
        <form className="flex flex-col justify-center gap-6 mt-[-30px] ">
            <div className="flex justify-around ">
                <input type="text" placeholder="First Name" className="px-[4px] border border-black rounded nmx-auto w-[40%] h-10 "></input>
                <input type="text" placeholder="Last Name" className="px-[4px] border border-black rounded nmx-auto w-[40%] h-10"></input>
            </div>
            <div className="flex flex-col justify-center gap-5">
                <input type="email" placeholder="Enter Email" className="px-[4px] border border-black rounded mx-auto w-[90%] h-10"></input>
                <input type="password" placeholder="Enter Password" className="px-[4px] border border-black rounded mx-auto w-[90%] h-10 "></input>
            </div>
            <button  className="border text-white text-center border-black bg-[#4069FF] rounded-xl justify-center mx-auto item-center w-[50%] h-14 font-bold">Open Account
                
            </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationComponent;
