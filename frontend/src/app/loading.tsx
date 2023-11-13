"use client";
import Lottie from "lottie-react";
import loadingc from "./assets/loading.json";

export default function loading() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-color-main">
      <div className="h-fit mt-[-20%] flex flex-col justify-center items-center ">
        <Lottie animationData={loadingc} loop={true} className="h-48 w-48" />
        <h1 className="text-2xl my-4 text-gray-400">Loading...</h1>
      </div>
    </div>
  );
}
