// import { useWeather } from "./useWeather";

import { useWeather } from "./useWeather";

// import clear from "../../assets/clear.png"
// import cloud from "../../assets/cloud.png";
// import drizzle from "../../assets/drizzle.png"
// import rain from "../../assets/rain.png"
// import snow from "../../assets/snow.png"

export default function Weather() {
  const { weatherData } = useWeather();
  // console.log(weatherData);

  if (weatherData)
    return (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0].icon}@4x.png`}
        />
      </div>
    );

    return <>Some thing went wrong!</>
}
