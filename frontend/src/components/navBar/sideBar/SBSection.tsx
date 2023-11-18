"use client";
export default function SBSection(prompt: {
  sectionName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full   overflow-auto
    
    // small screen
    my-4
    // Big screen
    md:my-8
    ">
      <p className="text-gray-400 mb-8 text-center  font-bold
       // small screen
       min-[0px]:text-sm
       // Big screen
       md:text-base
      
      ">
        {prompt.sectionName}
      </p>
      {prompt.children}
    </div>
  );
}
