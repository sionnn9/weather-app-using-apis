import React from "react";

const card = (prop) => {
  return (
    <div className=" pt-5">
      <div
        className={`w-80 h-80 bg-blue-500 rounded-xl p-5 font-bold text-3xl flex flex-col items-center justify-start ${prop.className}`}
      >
        <div>{prop.city}</div>
        <div>{prop.name}</div>
        <div>{prop.description}</div>
        <div>{prop.humidity}</div>
        <div>{prop.temp}</div>
      </div>
    </div>
  );
};

export default card;
