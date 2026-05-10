import { useState } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import { fetchWeather } from "./services/weatherApi";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchWeather(city);

      setWeather(data.current);
      setForecast(data.forecast);
    } catch (err) {
      setWeather(null);
      setForecast([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-5xl mx-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Weather App
      </h1>

      <SearchBox onSearch={handleSearch} />

      {loading && (
        <p className="text-center mt-4 text-blue-500 font-semibold">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-center mt-4 text-red-500 font-semibold">
          {error}
        </p>
      )}

      <WeatherCard weather={weather} />
      <ForecastList forecast={forecast} />
    </div>
  );
}

export default App;