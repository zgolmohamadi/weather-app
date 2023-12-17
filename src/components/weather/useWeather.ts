import { useEffect, useState } from "react";
import { current_weather } from "../../type/weather";

const API_KEY = "94561524B38B63E8E87C340356CE76CA";

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<current_weather>();

  useEffect(() => {
    //get ip
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
        //   const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
        //   const ip = data.match(ipRegex)?.[0];

          
            console.log(data);
            
            getLocation(data.ip);
          
        }
      });
    //get location

    //   await fetch(`http://www.geoplugin.net/json.gp?ip=${myIp}`)
    function getLocation(ip: string) {
      fetch(`https://api.ip2location.io/?key=${API_KEY}&ip=${ip}`)
        .then((response) => response.json())
        .then((positionData) => {
          fetchWeather({
            lat: positionData.geoplugin_latitude,
            lon: positionData.geoplugin_longitude,
          });
        });
    }

    //get weather
    function fetchWeather(data: { lat: string; lon: string }) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=693b7d8a32d73c65f026d643e50ce6e5`
      )
        .then((res) => res.json())
        .then((response) => {
          setWeatherData(response);
        });
    }
  }, []);

  return { weatherData };
};
