import { DateTime } from "luxon";
import { HistoricalData } from "../type/weather";

const API_KEY = "1fa9ff4126d95b8db54f3897a208e91c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const NUMBER_OF_FORCAST = 7;

const getWeatherData = async (
  infoType: unknown,
  searchParams: Record<string, unknown>,
  useSample?: { type: "history" | "weather" }
) => {
  const url = new URL(BASE_URL + "/" + infoType);
  const searchParam = new URLSearchParams({ ...searchParams, appid: API_KEY });
  url.search = searchParam.toString();

  return await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if ("message" in data) throw new Error(data.message);
      return data;
    })
    .catch((error) => {
      if (error instanceof TypeError && error.message.includes("API key")) {
        console.error("Invalid API key:", error);
      } else {
        console.error("There was a problem with the Fetch operation:", error);
      }

      if (useSample) {
        return import("../data/index").then((module) =>
          module.getSampleData(useSample.type)
        );
      }
    });
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { daily, hourly } = data;
  const { timezone } = data;

  daily = daily.slice(1, NUMBER_OF_FORCAST).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, NUMBER_OF_FORCAST).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  const temp = data.current.temp;

  return { timezone, daily, hourly, temp };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    units: searchParams.unit,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatWeatherHistory = (data: HistoricalData, timezone?: string) => {
  const { list } = data;

  const dataList =
    list.length > NUMBER_OF_FORCAST ? list.slice(1, NUMBER_OF_FORCAST) : list;

  const mappedList = dataList.map((item) => {
    return {
      title: timezone ? formatToLocalTime(item.dt, timezone, "LL/dd/yyyy") : "",
      temp: item.main.temp,
      icon: item.weather[0].icon,
    };
  });

  return mappedList;
};

const getHistoryWeatherData = async (
  searchParams: Record<string, unknown>,
  timezone?: string
) => {
  const formattedWeatherHistory = await getWeatherData(
    "history/city",
    searchParams,
    { type: "history" }
  ).then((data) => {
    return formatWeatherHistory(data, timezone);
  });

  console.log({ formattedWeatherHistory });

  return formattedWeatherHistory;
};

const formatToLocalTime = (
  secs: string,
  zone: string,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { iconUrlFromCode, formatToLocalTime, getHistoryWeatherData };
