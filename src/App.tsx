import SearchInput from "./components/SearchInput";
import TimeAndLocation from "./components/TimeAndLocation";
import TempretureAndDetails from "./components/TempretureAndDetails.tsx";
import Forcast from "./components/Forcast/index.tsx";
import { useEffect, useState } from "react";
import getFormattedWeatherData from "./services/weatherService.ts";
import { HistoricalDataType, UnitType, WeatherType } from "./type/weather.ts";
import toast from "react-hot-toast";
import WeatherByDateRange from "./components/WeatherByDateRange/index.tsx";

function App() {
  const [query, setQuery] = useState<Record<string, string | number>>({
    q: "tehran",
  });
  const [unit, setUnit] = useState<UnitType>("metric");
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [dailyIsVisible, setDailyIsVisible] = useState<boolean>(false);

  const [historicalData, setHistoricalData] = useState<HistoricalDataType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const message = query.q ? query.q : "current location.";

      toast("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, unit }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };
    fetchData();
  }, [query, unit]);

  return (
    <div className="mx-auto max-w-screen-md md:my-4 my-0 py-10 md:w-[600px] px-3 sm:px-5 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 from-cyan-700 to-blue-700">
      <SearchInput setUnit={setUnit} setQuery={setQuery} unit={unit} />
      {!weather && (
        <span className="mt-5 text-white flex justify-center">
          Please waite ...
        </span>
      )}
      {weather && (
        <>
          <TimeAndLocation
            dt={weather.dt}
            timezone={weather.timezone}
            country={weather.country}
            name={weather.name}
          />
          <TempretureAndDetails weather={weather} />
          <Forcast title="Hourly Forcast" items={weather.hourly} />
          <button
            onClick={() => setDailyIsVisible(!dailyIsVisible)}
            className={`text-white border border-solid border-white p-2 mt-4 transition ease-out ${
              dailyIsVisible ? "bg-white !text-cyan-700" : ""
            }`}
          >
            Show Daily Forcast
          </button>
          {dailyIsVisible && (
            <>
              <Forcast title="Daily Forcast" items={weather.daily} />
            </>
          )}
          <WeatherByDateRange
            setHistoricalData={setHistoricalData}
            location={{ lat: weather.lat, lon: weather.lon }}
            timezone={weather.timezone}
          />

          {historicalData && historicalData?.length > 0 && (
            <Forcast title="historical weather" items={historicalData} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
