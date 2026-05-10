const ForecastList = ({ forecast }) => {
  if (!forecast.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        5-Day Forecast
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-6">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-[#f5f5f5] shadow-sm py-4 px-5 rounded-lg text-center text-black"
          >
            <p className="font-semibold">{day.date}</p>

            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt="icon"
              className="mx-auto"
            />

            <p className="text-xl font-bold">{day.temp}°C</p>
            <p className="capitalize text-sm text-gray-600">{day.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;