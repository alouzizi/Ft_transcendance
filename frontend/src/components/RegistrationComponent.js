"use client"
function RegistrationComponent() {

  // const handleRegister42 = () => {
  //  console.log("ffff");
  // };

  return (
    <div className="w-[380px] h-[434px] border-[1px] border-black rounded-[17px] p-[20px]" >
      <div className="py-[50px] flex justify-center">
        <button onClick={() => {handleRegister42}} className='flex justify-center items-center gap-x-[10px] font-bold h-[42px] w-[122px] border-[1px] border-[#4069FF] rounded-[12px]'>
          <img className='w-[29px]' src="/42.svg"/>
          School
        </button>
      </div>

      <div className="text-[14px] py-[30px]">
        <from className="flex flex-col gap-[20px] items-center">
          <div className="flex justify-between w-full">
            <input className="w-[160px] h-[35px] border-[1px] border-black rounded-[5px] pl-[10px]" placeholder="First Name" />
            <input className="w-[160px] h-[35px] border-[1px] border-black rounded-[5px] pl-[10px]" placeholder="Last Name" />
          </div>
          <input className="w-full h-[35px] border-[1px] border-black rounded-[5px] pl-[10px]" placeholder="Enter Email" />
          <input className="w-full h-[35px] border-[1px] border-black rounded-[5px] pl-[10px]"  placeholder="Enter Password" />
          <button className="h-[50px] w-[180px] bg-[#4069FF] rounded-[8px] text-[white] text-[16px] font-[700]">Create</button>
        </from>
      </div>
    </div>
  );
}
export default RegistrationComponent;
