import React from "react";

const card = (prop) => {
  return (
    <div className=" pt-5">
      <div
        className={`w-96 h-96 bg-gradient-to-b from-sky-500 via-green-400 to-[#83461a]  rounded-xl p-5  flex flex-col items-center text-center justify-start ${prop.className}`}
      >
        <div className="font-semibold">
          <div className="font-bold text-4xl flex justify-start items-center  underline">
            {prop.name}
          </div>
          <div className="text-6xl pt-4">
            {prop.temp !== null && prop.temp !== "" ? `${prop.temp}°C` : ""}
          </div>
          <div className="text-3xl pt-5">
            {" "}
            {prop.humidity !== null && prop.humidity !== ""
              ? `Humidity:${prop.humidity}%`
              : ""}
          </div>
          <div className="text-3xl pt-5">{prop.description}</div>
          <div className="text-8xl pt-3">{prop.icon}</div>
        </div>
      </div>
    </div>
  );
};

export default card;
