"use client";

import ImageUpload from "./imageupload";

export default function SettingsPage() {
  return (
    <>
      <div className="border min-w-[400px] rounded-2xl flex flex-col items-center h-1/3 w-1/3 pt-10 gap-14">
        <form className="flex flex-col justify-center gap-6 mt-[-30px] w-full border ">
          <label>Profile Image</label>
          <ImageUpload />
          <div className="flex flex-col w-full border">
            <input
              type="email"
              placeholder="Nickname"
              className="px-[4px] border border-black rounded mx-auto my-3 w-[90%] h-10"
            ></input>
            <input
              type="email"
              placeholder="Nickname"
              className="px-[4px] border border-black rounded mx-auto my-3 w-[90%] h-10"
            ></input>
            <input
              type="email"
              placeholder="Nickname"
              className="px-[4px] border border-black rounded mx-auto my-3 w-[90%] h-10"
            ></input>
            <label>two factor</label>
            {/* <SwitchExample> </SwitchExample> */}
          </div>
          <button className="border text-white text-center border-black bg-[#4069FF] rounded-xl justify-center mx-auto item-center w-[50%] h-14 font-bold">
            SAVE
          </button>
        </form>
      </div>
    </>
  );
}
