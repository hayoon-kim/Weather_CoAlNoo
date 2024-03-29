import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./Component/WeatherBox";
import WeatherButton from "./Component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    let response = await fetch(url);
    setLoading(false);
    let data = await response.json();
    setWeather(data);
  };

  const getWheaterByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb41f5bcfb13ae6835bac4080a9612bd&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    setLoading(false);
    let data = await response.json();
    setWeather(data);
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWheaterByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#f88cb"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} city={city} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            getCurrentLocation={getCurrentLocation}
          />
        </div>
      )}
    </div>
  );
}

export default App;
