export default function HomePage() {
  return (
    <div className="flex flex-col bg-color-main h-screen w-screen pl-32 justify-center">
      <div
        className="bg-slate-100 h-96 w-5/6 max-w-7xl bg-cover bg-center rounded-3xl mx-auto relative"
        style={{ backgroundImage: "url('/bg-info.png')" }}
      >
        <img
          className="w-28 h-28 object-cover mx-auto mb-[-2rem] rounded-full border-2
         border-color-main shadow-[0px_0px_10px_rgba(0,0,0,0)] 
          hover:shadow-transparent 
          z-10 absolute bottom-1/3 left-6"
          src="profile-img.png"
          alt=""
        />
        <div
          className="w-full h-1/3 bg-color-main-dark  rounded-bl-2xl rounded-br-2xl
          absolute bottom-0"
        >
          <div className="ml-6 absolute top-1/3">
            <h1>Player Full Name</h1>
            <p className="text-gray-400 text-sm">@userName</p>
          </div>
        </div>
      </div>
    </div>
  );
}
