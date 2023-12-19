import { useState } from "react";
import { DateTime } from "luxon";
import { HistoricalDataType } from "../../type/weather";
import { getHistoryWeatherData } from "../../services/weatherService";

type WeatherByDateRangeProps = {
  location?: { lat: number; lon: number };
  timezone?: string;
  setHistoricalData: (d: HistoricalDataType[]) => void;
};

export default function WeatherByDateRange({
  setHistoricalData,
  location,
  timezone,
}: WeatherByDateRangeProps) {
  const [start, setStart] = useState<Date | null>();
  const [end, setEnd] = useState<Date | null>();

  const onHistoricalClickHandle = async () => {
    const startDateObj = {
      year: start?.getFullYear(),
      month: start?.getMonth(),
      day: start?.getDay(),
      hour: start?.getHours(),
      minute: start?.getMinutes(),
    };
    const endDateObj = {
      year: end?.getFullYear(),
      month: end?.getMonth(),
      day: end?.getDay(),
      hour: end?.getHours(),
      minute: end?.getMinutes(),
    };

    await getHistoryWeatherData(
      {
        lat: location?.lat,
        lon: location?.lon,
        start: DateTime.fromObject(startDateObj).toUnixInteger(),
        end: DateTime.fromObject(endDateObj).toUnixInteger(),
        type: "hour",
      },
      timezone
    ).then((data) => {
      if (setHistoricalData) setHistoricalData(data);
    });
  };

  return (
    <div className="mt-5 md:flex">
      <label className="text-lg text-white mr-1">select date: </label>
     <div className="mt-2 md:mt-0">
     <input
        type="date"
        placeholder="mm/dd/yyyy"
        className="focus:outline-none mr-2 text-black p-1 placeholder:text-gray-300"
        onChange={(e) => setStart(new Date(e.target.value))}
      />
      <input
        type="date"
        placeholder="mm/dd/yyyy"
        className="focus:outline-none mr-2  text-black p-1 mt-1 sm:mt-0 placeholder:text-gray-300"
        onChange={(e) => setEnd(new Date(e.target.value))}
      />
     </div>
      <button
        onClick={onHistoricalClickHandle}
        disabled={!start || !end}
        className=" text-white border-white border-solid border py-1 px-2 mt-2 md:mt-0 disabled:opacity-60"
      >
        Forcast
      </button>
    </div>
  );
}
