function RegistrationComponent() {

  const handleRegister42 = () => {
   console.log("ffff");
  };

  return (
    <div>
     <button onClick={() => {handleRegister42}} className='flex justify-center items-center gap-x-[10px] font-bold h-[42px] w-[122px] border-[1px] border-[#4069FF] rounded-[12px]'>
      <img className='w-[29px]' src="/42.svg"/>
      School
     </button>
    </div>
  );
}

export default RegistrationComponent;
