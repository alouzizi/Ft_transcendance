import React from "react";

type MyComponentProps = {
  imageSrc: string;
  text: string;
  link: string;
};

const MyComponent = ({ imageSrc, text, link }: MyComponentProps) => {
  return (
    <div className="flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
        <img
          src={imageSrc}
          alt="Image"
          className="object-cover  w-screen rounded-l-lg"
        />
      </div>
      <div className="p-6">
        <h4 className="mb- block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"> Test</h4>
        <p
          className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased"
          style={{
            fontFamily: "Fredoka One, sans-serif",
            fontWeight: 700, 
            lineHeight: "16px",
            letterSpacing: "0em",
            textAlign: "left",
          }}
        >
          {text}
        </p>
        <button
          className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => navigateToAnotherPage()}
        >
          Play
        </button>
      </div>
    </div>
  );
};

function navigateToAnotherPage() {
  // Your navigation logic here
}

export default MyComponent;
