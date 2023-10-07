import React from "react";

export default function MyDropDown(prompt:{ showDropdown:boolean, setShowDropdown:()=>void, items:string[] }){
  return (
    <div className="dropdown-wrapper">
      <button onClick={prompt.setShowDropdown} className="trigger-button">
        Items
      </button>
      <ul className={prompt.showDropdown ? "active" : ""}>
        {prompt.items.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

