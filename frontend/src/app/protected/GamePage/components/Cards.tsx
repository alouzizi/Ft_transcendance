const Mycards = ({
  onSelect,
  imageSrc,
}: {
  onSelect: () => void;
  imageSrc: string;
}) => {
  return (
    <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-44 my-2 mx-auto lg:mr-16">
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <img className="rounded-t-lg" src={imageSrc} alt="" />
        <a href="#!">
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </a>
      </div>
      <div className="pl-8  pt-1 bg-color-main-dark">
        <button
          onClick={() => {
            if (imageSrc === "/map1.png") onSelect();
            else if (imageSrc === "/map2.png") onSelect();
            else if (imageSrc === "/map3.png") onSelect();
          }}
          className="bg-color-main relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="bg-color-main relative px-5 py-2.5 transition-all ease-in duration-75  text-white rounded-md group-hover:bg-opacity-0">
            Select Map
          </span>
        </button>
      </div>
    </div>
  );
};

export default Mycards;
