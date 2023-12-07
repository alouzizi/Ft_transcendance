"use client";
import Lottie from "lottie-react";
import loadingc from "./assets/loading.json";

export default function Custom404() {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-color-main">
            <Lottie animationData={loadingc} loop={true} className="h-48 w-48" />
            <h1 className="text-white">404 - Page Not Found</h1>
        </div>
    )


}