import React from "react";

const card = (prop) => {
  return (
    <div className="">
      <div className="w-72 h-72 bg-blue-500 rounded-xl p-5">{prop.name}</div>
    </div>
  );
};

export default card;
