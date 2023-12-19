import { formatToLocalTime } from "../../services/weatherService";
import { WeatherType } from "../../type/weather";

function TimeAndLocation({
  dt,
  timezone,
  country,
  name,
}: Pick<WeatherType, "dt" | "timezone" | "country" | "name">) {
  return (
    <div className="flex justify-center items-center flex-col mx-auto py-3 text-white">
      <span className="text-xl text-light font-extralight">
        {formatToLocalTime(dt, timezone)}
      </span>
      <span className="flex items-center justify-center text-3x font-medium mt-2 ">
        {country}, {name}{" "}
      </span>
    </div>
  );
}
export default TimeAndLocation;
