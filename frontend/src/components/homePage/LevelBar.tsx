export default function LevelBar(prompt: {
    level: number,
    completed: number
  }) {
  
    // Calculate the width as a percentage
    const completedWidth = `${prompt.completed}%`;
  
    return (
      <div className="h-16 w-1/2 bg-color-main-transparent rounded-xl 
        flex flex-col justify-center items-center absolute bottom-1/3 mb-4 left-[25%] ">
        <div
          style={{ width: completedWidth }} // Set the width as a style
          className="h-full bg-color-main-whith rounded-xl absolute left-0"
        ></div>
        <p className="text-white font-bold text-md w-fit absolute">
          {`LEVEL ${prompt.level} - ${prompt.completed}%`}
        </p>
      </div>
    );
  }
  