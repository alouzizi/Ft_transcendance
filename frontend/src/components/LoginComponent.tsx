"use client";

const LoginComponent = () => {
    return (
      <>
        <div className="min-w-[400px] border border-black rounded-2xl flex flex-col items-center h-1/3 w-1/3 pt-10 gap-14">
       <button className="border border-blue-500 rounded-xl flex justify-center mx-auto items-center w-28 h-10">
          <img className='w-[29px]' src="/42.svg"/>
            school
          </button>
          <div className="flex flex-row w-full justify-around items-center mt-[-20px]">
            <div className="border border-gray-300 w-[30%] h-[1px] mr-[-70px]"></div>
              <p className="text-gray-400">OR</p>
            <div className="border border-gray-300 w-[30%] h-[1px] ml-[-70px]"></div>
          </div>
          <form className="flex flex-col justify-center gap-6 mt-[-30px] w-full">
              <div className="flex flex-col justify-center gap-5 ">
                  <input type="email" placeholder="Enter Email" className="px-[4px] border border-black rounded mx-auto w-[80%] h-10"></input>
                  <input type="password" placeholder="Enter Password" className="px-[4px] border border-black rounded mx-auto w-[80%] h-10 "></input>
              </div>
              <button  className="border text-white text-center border-black bg-[#4069FF] rounded-xl justify-center mx-auto item-center w-[50%] h-14 font-bold">Login
                  
              </button>
          </form>
        </div>
      </>
    );
  };
  
  export default LoginComponent;