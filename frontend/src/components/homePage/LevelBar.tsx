"use client";
export default function LevelBar(prompt: {
    level: number,
    completed: number
  }) {
  
    // Calculate the width as a percentage
    const completedWidth = `${prompt.completed}%`;
  
    return (
      <div className="
      flex flex-col justify-center items-center absolute
      bg-color-main-transparent rounded-xl 

        // small screen
        h-14 w-2/3 bottom-1/3 mb-4 left-[18%]  top-1/4
        
        // Big screen
        2xl:h-16 2xl:w-1/2  2xl:top-auto 2xl:bottom-1/3 2xl:mb-8 2xl:left-[25%] 
        ">
        <div
          style={{ width: completedWidth }} // Set the width as a style
          className="h-full bg-color-main-whith rounded-xl absolute left-0"
        ></div>
        <p className="text-white font-bold  w-fit absolute  min-[0px]:text-xs 2xl:text-lg 
        ">
          {`LEVEL ${prompt.level} - ${prompt.completed}%`}
        </p>
      </div>
    );
  }
   