import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./Component/WeatherBox";
import WeatherButton from "./Component/WeatherButton";

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["Paris", "New york", "tokyo", "seoul"];
  const [city, setCity] = useState("");

  const searchByCity = (cityName) => {
    setCity(cityName);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherCurrentLocation(lat, lon);
    });
  };

  const getWeatherCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bb41f5bcfb13ae6835bac4080a9612bd&units=metric`;

    let response = await fetch(url);

    let data = await response.json();
    setWeather(data);
  };

  const getWheaterByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb41f5bcfb13ae6835bac4080a9612bd&units=metric`;

    let response = await fetch(url);

    let data = await response.json();
    setWeather();
  };

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWheaterByCity();
    }
  }, [city]);

  return (
    <div>
      <div className="container">
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} setCity={setCity} />
      </div>
    </div>
  );
}

export default App;
