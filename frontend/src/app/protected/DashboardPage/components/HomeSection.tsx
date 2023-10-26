"use client";
export default function HomeSection(prompt: {
  sectionName?: string;
  btnName?: string;
  btnClicked?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col 
      transition-all duration-400 ease-in-out 

        
       
        // small screen
        w-full p-2 h-fit mb-12
        // Big screen
        2xl:w-2/5 2xl:p-2 2xl:h-fit 2xl:mb-0
        "
    >
      <div className="flex flex-row justify-between mb-4">
        <h1
          className="font-bold text-2xl text-gray-400 text-center  h-fit my-auto

                 // smaller screen
                 min-[0px]:text-base

                 // bigger screen
                 md:text-2xl
                "
        >
          {prompt.sectionName ?? "Section Name"}
        </h1>
        <p
          onClick={prompt.btnClicked}
          className="border-2 border-white p-2 px-4 ml-2 rounded-full text-xs cursor-pointer
                hover:text-gray-400 hover:border-gray-400
                active:text-white active:border-white

                // smaller screen
                min-[0px]:text-xs

                // bigger screen
                md:text-sm
                
                "
        >
          {prompt.btnName ?? "See All Section"}
        </p>
      </div>
      <div className="mb-6 h-[0.05rem] bg-gray-400" />
      {prompt.children}
    </div>
  );
}
