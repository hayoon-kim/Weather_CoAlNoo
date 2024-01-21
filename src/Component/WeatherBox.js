import React from "react";

function WeatherBox({ weather }) {
  return (
    <div className="weather-box">
      <div className="">{weather?.name}</div>
      <h2>
        {weather?.main.temp}도 / {(parseInt(weather?.main.temp) * 9) / 5 + 32}
        화씨
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
}

export default WeatherBox;
