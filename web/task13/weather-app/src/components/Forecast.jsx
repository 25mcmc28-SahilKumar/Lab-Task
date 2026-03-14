import React, { useState } from "react";
import { getForecast } from "../services/api";

function Forecast() {

  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);

  const fetchForecast = async () => {
    try {
      const res = await getForecast(city);
      setForecast(res.data.list.slice(0, 5));
    } catch (error) {
      console.log("Error fetching forecast");
    }
  };

  return (
    <div>

      <h2>5 Day Forecast</h2>

      <input
        type="text"
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchForecast}>
        Get Forecast
      </button>

      {forecast.map((item, index) => (
        <div key={index}>
          <p>Temp: {item.main.temp} °C</p>
          <p>{item.weather[0].description}</p>
        </div>
      ))}

    </div>
  );
}

export default Forecast;