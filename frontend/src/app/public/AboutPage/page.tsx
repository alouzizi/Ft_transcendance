"use client";

import { Text } from "@radix-ui/themes";
import AboutItem from "./AboutItem";
export default function AboutPage() {
  return (
    <div className="flex flex-col bg-color-main w-screen h-fit h-min-screen items-center justify-around ">
      <div className="min-w-fit max-w-[48rem] w-[70%] m-8 sm:m-12 h-fit ">
        <div className="relative mx-auto h-fit">
          <img
            src="/rt2.png"
            alt="Your Image Alt Text"
            className="rounded-md w-full"
          />
          <p
            className="absolute  
            h-fit w-full p-6  top-0 text-xs
          md:top-[20%] md:p-12 md:text-lg
          lg:text-4xl lg:p-16
          text-md  text-center  text-white"
          >
            Dive into the passion and hard work that brought PingPongMaster to
            life. Discover how our dedicated team of students crafted an
            exhilarating online ping pong experience just for you.
          </p>
        </div>
      </div>

      <div className="flex flex-col  w-screen justify-center text-center mb-12 ">
        {/* text */}
        <div className="flex flex-col text-center flex-grow m-4 sm:m-12 p-4">
          <p className="lg:text-4xl sm:text-2xl text-md">
            Let's meet our developers
          </p>
          <p className="lg:text-xl pt-3 mb-4 md:mb-8 mt-4 text-xs sm:text-lg">
            who've crafted PongMaster. Connect with us for all things Pong -
            strategy, feedback, or just to say hello!
          </p>
        </div>
        {/* /text */}

        <div className="w-full bg-[#111623]">
          <div
            className="py-6 my-6   max-w-4xl mx-auto
        
        grid 
          
         // small screen
         grid-cols-2 gap-x-5 gap-y-3 w-[70%]

         sm:grid-cols-2 sm:gap-x-10 sm:w-[60%] sm:gap-y-6 

         // Big screen
         lg:grid-cols-3 lg:gap-x-12
        
        "
          >
            <AboutItem
              name={"Hamza Boumahdi"}
              role={"Software developer"}
              image={"https://avatars.githubusercontent.com/u/93520723?v=4"}
            />
            <AboutItem
              name={"Ali Louzizi"}
              role={"Software developer"}
              image={
                "https://cdn.intra.42.fr/users/67e2a8e9ce8710fe1d6df41c600895b7/alouzizi.jpg"
              }
            />
            <AboutItem
              name={"Lhoussaine Ahammam"}
              role={"Software developer"}
              image={
                "https://cdn.intra.42.fr/users/e812cee4ab5714ce8d741370f87db885/lahammam.jpg"
              }
            />
            <AboutItem
              name={"Saliha Lammari"}
              role={"Software developer"}
              image={
                "https://cdn.intra.42.fr/users/d375c15c56b88f37ea3f5a2a26942aa1/slammari.jpg"
              }
            />
            <AboutItem
              name={"Younes Jarhbou"}
              role={"Software developer"}
              image={
                "https://cdn.intra.42.fr/users/7c758168152fe135cf85b9f3b4f229d5/yjarhbou.jpg"
              }
            />
          </div>
        </div>
      </div>
      <footer className="w-full  bg-color-main-dark mt-16">
        <p className="text-[#A4A4A4] my-4 w-full text-center text-xs lg:text-lg">
          Copyright © 2023 PongMaster All rights reserved.
        </p>
      </footer>
    </div>
  );
}
