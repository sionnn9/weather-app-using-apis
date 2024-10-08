"use client";
import "/src/app/globals.css"; // Ensure this file contains Tailwind directives
import { useState } from "react";
import { useEffect } from "react";
import Card from "@/components/card"; // Ensure Card component is correctly imported

export default function Home() {
  const [val, setVal] = useState("");
  const [displayValue, setDisplayValue] = useState("");

  const api = "db68a74578b13f949b41ec6b9a63721d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${api}`;
  async function getData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  }

  const change = (event) => {
    setVal(event.target.value);
  };

  const handleButtonClick = () => {
    setDisplayValue(val);
    getData(url).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-x-hidden bg-sky-300">
      <h1 className="mb-10 text-2xl font-semibold">Weather App</h1>

      <div className="flex items-center space-x-4">
        <input
          onChange={change}
          placeholder="Enter place"
          className="border-black hover:border-gray-700 border-solid border-2 rounded p-2"
        />
        <button
          onClick={handleButtonClick}
          className="bg-black hover:bg-slate-500 rounded-xl text-white p-2 w-24 h-10"
        >
          Enter
        </button>
      </div>
      <h1 className="mt-4 text-lg">{displayValue}</h1>
      <Card name={displayValue}></Card>
    </div>
  );
}
