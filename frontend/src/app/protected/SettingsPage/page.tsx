"use client";

import ImageUpload from "./imageupload";

export default function SettingsPage() {
  return (
    <>
      <form className="flex bg-slate-400 border border-green-500 flex-col justify-center gap-6 w-[500px]">
        <div className="border border-red-500 min-w-[400px] h-40 rounded-2xl flex flex-col items-center w-full pt-10 gap-14">

        </div>
        <ImageUpload/>
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
          <label className="text-white">two factor</label>
          {/* <SwitchExample> </SwitchExample> */}
        </div>
        <button className="border text-white text-center border-black bg-[#4069FF] rounded-xl justify-center mx-auto item-center w-[50%] h-14 font-bold">
          SAVE
        </button>
      </form>
    </>
  );
}
