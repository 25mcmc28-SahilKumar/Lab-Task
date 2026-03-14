import React, { useState, useEffect } from "react";
import { getWeather, getForecast } from "../services/api";

function Weather() {
  const [city, setCity] = useState("Chandigarh");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async (cityName) => {
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        getWeather(cityName),
        getForecast(cityName),
      ]);
      setWeather(weatherRes.data);
      setForecast(forecastRes.data.list.slice(0, 5));
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
      setForecast([]);
    }
  };

  useEffect(() => {
    fetchData(city);
  }, []);

  function handleSearch() {
    fetchData(city);
  }

  return (
    <div>
      <h2>Weather App</h2>

      <input
        type="text"
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div>
          <h3>5 Day Forecast</h3>
          {forecast.map((item, index) => (
            <div key={index}>
              <p>{item.dt_txt}</p>
              <p>Temp: {item.main.temp} °C</p>
              <p>{item.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Weather;