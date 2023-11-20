"use client";
import React from "react";
import { Text } from "@radix-ui/themes";

export default function AboutItem(prompt: {
  name: string;
  role: string;
  image: string;
}) {
  return (
    <div className=" flex flex-col items-center p-1">
      <img
        className="w-[30%] mx-2 border-2 border-[#4069FF] rounded-lg"
        src={prompt.image}
      />
      <Text weight="bold" className="pt-2">
        {prompt.name}
      </Text>
      <Text weight="light" size="1" className="">
        {prompt.role}
      </Text>
    </div>
  );
}
