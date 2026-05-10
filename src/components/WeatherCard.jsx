// src/components/WeatherCard.jsx

import { useState, useEffect } from "react";
import SunWithClouds from "../assets/sun-with-cloud.png";
import Winter from "../assets/winter.png";
import Rain from "../assets/rain.png";
import Summer from "../assets/summer.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";

const WeatherCard = ({ weather }) => {
  const [date] = useState(new Date());
  const [weatherImage, setWeatherImage] = useState(SunWithClouds);

  // useEffect MUST be called before any return statement
  useEffect(() => {
    // If no weather data, keep default image
    if (!weather) {
      setWeatherImage(SunWithClouds);
      return;
    }

    const desc = weather.desc.toLowerCase();

    if (desc.includes("rain")) {
      setWeatherImage(Rain);
    } else if (desc.includes("snow")) {
      setWeatherImage(Winter);
    } else if (desc.includes("clear")) {
      setWeatherImage(Summer);
    } else if (desc.includes("cloud")) {
      setWeatherImage(SunWithClouds);
    } else {
      setWeatherImage(SunWithClouds);
    }
  }, [weather]);

  // Return AFTER all hooks are declared
  if (!weather) return null;

  // Format current time
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="text-center p-6 mt-6 text-black">
      {/* City Name */}
      <h2 className="text-3xl font-semibold capitalize">
        {weather.city}
      </h2>

      {/* Day and Current Time */}
      <h2 className="text-md mt-2 uppercase text-gray-600">
        {date.toLocaleDateString("en-US", {
          weekday: "long",
        })}{" "}
        {formattedTime}
      </h2>

      {/* Weather Image */}
      <div className="flex justify-center pt-7">
        <img
          src={weatherImage}
          alt={weather.desc}
          className="w-28"
        />
      </div>

      {/* Temperature */}
      <h1 className="text-5xl font-medium mt-8">
        {weather.temp}°C
      </h1>

      {/* Weather Description */}
      <p className="text-lg pt-2 italic capitalize text-gray-600">
        {weather.desc}
      </p>

      {/* Humidity and Wind Cards */}
      <div className="flex flex-col sm:flex-row gap-5 items-center mt-10 justify-center">
        {/* Humidity Card */}
        <div className="border border-blue-300 p-4 flex items-center gap-4 rounded-xl shadow-md min-w-[200px]">
          <div className="w-10">
            <img
              src={humidity}
              className="w-full"
              alt="Humidity"
            />
          </div>
          <div>
            <p className="font-medium">Humidity</p>
            <p className="font-bold text-blue-500 text-lg">
              {weather.humidity}%
            </p>
          </div>
        </div>

        {/* Wind Card */}
        <div className="border border-blue-300 p-4 flex items-center gap-4 rounded-xl shadow-md min-w-[200px]">
          <div className="w-10">
            <img
              src={wind}
              className="w-full"
              alt="Wind"
            />
          </div>
          <div>
            <p className="font-medium">Wind</p>
            <p className="font-bold text-blue-500 text-lg">
              {weather.wind} m/s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;