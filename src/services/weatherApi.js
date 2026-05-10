// src/services/weatherApi.js
const API_KEY = "79ad71573cd79c0e556eea387a4d842b";

export const fetchWeather = async (city) => {
  try {
    const cleanCity = city.trim();

    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cleanCity
      )}&appid=${API_KEY}&units=metric`
    );

    const currentData = await currentResponse.json();

    // Invalid API key
    if (Number(currentData.cod) === 401) {
      throw new Error("Invalid API key");
    }

    // City not found
    if (Number(currentData.cod) !== 200) {
      throw new Error("City not found");
    }

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        cleanCity
      )}&appid=${API_KEY}&units=metric`
    );

    const forecastData = await forecastResponse.json();

    const dailyForecast = forecastData.list
      .filter((_, index) => index % 8 === 0)
      .slice(0, 5)
      .map((item) => ({
        date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        temp: Math.round(item.main.temp),
        desc: item.weather[0].description,
        icon: item.weather[0].icon,
      }));

    return {
      current: {
        city: currentData.name,
        temp: Math.round(currentData.main.temp),
        desc: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        wind: currentData.wind.speed,
      },
      forecast: dailyForecast,
    };
  } catch (error) {
    throw new Error(error.message || "Unable to fetch weather data");
  }
};