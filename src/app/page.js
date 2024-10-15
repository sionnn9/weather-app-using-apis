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
    id: null,
  });
  let [cels, setCels] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [isCardVisible, setIsCardVisible] = useState(false);

  const api = "db68a74578b13f949b41ec6b9a63721d";

  async function getData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setDisplayValue("Enter a valid city");
        setWeatherData({
          city: "",
          temp: null,
          humidity: null,
          description: "",
          id: null,
        });
        setCels("");
        setWeatherIcon("");
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
      setWeatherData({
        city: "",
        temp: null,
        humidity: null,
        description: "",
        id: null,
      });
      setCels("");
      setWeatherIcon("");
    }
  };
  let getWeatherData = (data) => {
    const {
      name: city,
      main: { temp, humidity },
      weather: [{ description, id }],
    } = data;
    setWeatherData({ city, temp, humidity, description, id });
    let celsiusTemp = (temp - 273).toFixed(1);
    setCels(celsiusTemp);
    console.log(celsiusTemp);
    setWeatherIcon(weatherEmoji(id));
  };

  const weatherEmoji = (id) => {
    switch (true) {
      case id >= 200 && id < 300:
        return "⛈️";
      case id >= 300 && id < 400:
        return "🌦️";
      case id >= 500 && id < 600:
        return "🌧️";
      case id >= 600 && id < 700:
        return "❄️";
      case id >= 700 && id < 800:
        return "🌫️";
      case id == 800:
        return "🌞";
      case id >= 801 && id < 810:
        return "☁️";
      default:
        return "👾";
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-x-hidden bg-[#2f65acfa]">
      <h1 className="mb-10 text-4xl underline font-semibold">Weather App</h1>
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
        temp={cels}
        icon={weatherIcon}
      ></Card>
    </div>
  );
}
