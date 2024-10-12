import React from "react";

const card = (prop) => {
  return (
    <div className=" pt-5">
      <div className="w-80 h-80 bg-blue-500 rounded-xl p-5 font-bold text-3xl flex flex-col items-center justify-start ">
        hidden
        <div>{prop.name}</div>
        <div className="text-5xl mt-5">90</div>
        <div className="text-4xl mt-5">weather</div>
        <div className="text-8xl mt-5">⛅</div>
      </div>
    </div>
  );
};

export default card;
