"use client";

import { Text } from "@radix-ui/themes";
import AboutItem from "./AboutItem";
export default function AboutPage() {
  return (
    <div className="flex flex-col bg-color-main w-screen h-full items-center justify-around">
      <div className="w-[70%] mt-12">
        <div className="relative">
          <img
            src="/rt2.png"
            alt="Your Image Alt Text"
            className="rounded-md"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <p>
              Dive into the passion and hard work that brought PingPongMaster to
              life. Discover how our dedicated team of students crafted an
              exhilarating online ping pong experience just for you.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col  w-screen justify-center text-center mt-8">
        <div className="flex flex-col text-center flex-grow">
          <Text weight="bold" className="text-lg">
            Let's meet our developers
          </Text>
          <Text weight="bold" className="text-sm pt-3">
            who've crafted PongMaster. Connect with us for all things Pong -
            strategy, feedback, or just to say hello!
          </Text>
        </div>

        <div className="flex justify-center py-6 mt-5 bg-[#111623] w-screen">
          <AboutItem
            name={"Hamza Boumahdi"}
            role={"Software developer"}
            image={
              "https://cdn.intra.42.fr/users/387a7e5f508f0a29a7cb90b87924713f/hboumahd.jpg"
            }
          />
          <AboutItem
            name={"Hamza Boumahdi"}
            role={"Software developer"}
            image={
              "https://cdn.intra.42.fr/users/387a7e5f508f0a29a7cb90b87924713f/hboumahd.jpg"
            }
          />
        </div>
      </div>

      <div> </div>
    </div>
  );
}
