"use client";

import ImageUpload from "./ImageUplaod";

const EditProfile = () => {
    return (
        <>
          <div className="border min-w-[400px] rounded-2xl flex flex-col items-center h-1/3 w-1/3 pt-10 gap-14">
            <form className="flex flex-col justify-center gap-6 mt-[-30px] ">
                <label>Profile Image</label>
                <ImageUpload/>
                <input></input>
                <div className="flex justify-around ">
                    <input type="text" placeholder="First Name" className="px-[4px] border border-black rounded nmx-auto w-[40%] h-10 "></input>
                    <input type="text" placeholder="Last Name" className="px-[4px] border border-black rounded nmx-auto w-[40%] h-10"></input>
                </div>
                <div className="flex flex-col justify-center gap-5">
                    <input type="email" placeholder="Enter Email" className="px-[4px] border border-black rounded mx-auto w-[90%] h-10"></input>
                    <input type="password" placeholder="Enter Password" className="px-[4px] border border-black rounded mx-auto w-[90%] h-10 "></input>
                </div>
                <button  className="border text-white text-center border-black bg-[#4069FF] rounded-xl justify-center mx-auto item-center w-[50%] h-14 font-bold">SAVE
                    
                </button>
            </form>
          </div>
        </>
      );
    };
    
  export default EditProfile;