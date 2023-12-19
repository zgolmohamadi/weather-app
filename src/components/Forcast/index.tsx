import { useState } from "react";
import { DateTime } from "luxon";
import {
  getHistoryWeatherData,
  iconUrlFromCode,
} from "../../services/weatherService";
import { ForcastItemType, HistoricalDataType } from "../../type/weather";

type ForcastType = "daily" | "hourly" |'histoty';

type ForcastPropType = {
  title: string;
  items: ForcastItemType[];
  type?: ForcastType;
  location?: { lat: number; lon: number };
  timezone?: string;
  setHistoricalData?:(d:HistoricalDataType[])=>void
};


export default function Forcast({
  title,
  items,
  type,
  location,
  timezone,
  setHistoricalData
}: ForcastPropType) {
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
   
     if(setHistoricalData) setHistoricalData(data);
    });

   
    
  };
  return (
    <div className="w-full text-white">
      {type === "daily" && (
        <div className="mt-5">
          <label className="text-lg">select date: </label>
          <input
            type="date"
            className="focus:outline-none mr-2 text-black p-1"
            onChange={(e) => setStart(new Date(e.target.value))}
          />
          <input
            type="date"
            className="focus:outline-none mr-2  text-black p-1"
            onChange={(e) => setEnd(new Date(e.target.value))}
          />
          <button onClick={onHistoricalClickHandle}>Forcast</button>
        </div>
      )}

      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2 " />

      <div className="flex flex-row items-center justify-between w-full">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center "
          >
            <p className="font-light text-xs">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
