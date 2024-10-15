"use client";
import "/src/app/globals.css"; // Ensure this file contains Tailwind directives
import { useState } from "react";
import Card from "@/components/card"; // Ensure Card component is correctly imported

export default function Home() {
  const [displayValue, setDisplayValue] = useState("");
  const [val, setVal] = useState("");
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: null,
    humidity: null,
    description: "",
  });
  const [isCardVisible, setIsCardVisible] = useState(false);

  const api = "db68a74578b13f949b41ec6b9a63721d";

  async function getData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setDisplayValue("Enter a valid city");
        throw new Error("Response not okay");
      }
      const data = await response.json();
      getWeatherData(data);
      setIsCardVisible(true);
      setDisplayValue(data.name); // Assuming you want to display the city name
      return data;
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  }

  const change = (event) => {
    setVal(event.target.value);
  };

  const handleButtonClick = () => {
    if (val.trim()) {
      getData(val).then((data) => {
        console.log(data);
      });
    } else {
      setIsCardVisible(true);

      setDisplayValue("Enter a city");
    }
  };
  let getWeatherData = (data) => {
    const {
      name: city,
      main: { temp, humidity },
      weather: [{ description, id }],
    } = data;
    setWeatherData({ city, temp, humidity, description, id });
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
      <Card
        className={`transition-opacity duration-300 ${
          isCardVisible ? "opacity-100" : "opacity-0"
        }`}
        name={displayValue}
        description={weatherData.description}
        humidity={weatherData.humidity}
        temp={weatherData.temp}
      ></Card>
    </div>
  );
}
