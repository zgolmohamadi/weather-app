import { faArrowDown, faArrowUp, faDroplet, faSun, faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatToLocalTime, iconUrlFromCode } from "../../services/weatherService";
import { WeatherType } from "../../type/weather";


export default function TempretureAndDetails({weather:{details,icon,temp, humidity, speed, sunrise, sunset, timezone, temp_max, temp_min}}:{weather:WeatherType}) {
  return (
    <div className="flex flex-col py-3 item w-full text-white mt-3">
        <div className="flex items-center justify-center mx-auto">{details}</div>
        <div className="flex justify-between items-center">
           
            <div className="w-1/3"> <img src={iconUrlFromCode(icon)} alt="" className="w-20 "/></div>
            <span className="text-5xl w-1/3 inline-flex justify-center">{`${temp.toFixed()}°`}</span>
            <div className="flex flex-col text-sm w-1/3 items-end">
                <span><FontAwesomeIcon icon={faDroplet} className="mr-1"/> Humidity: {`${humidity.toFixed()}%`} </span>
                <span className="mt-1"><FontAwesomeIcon icon={faWind} className="mr-1"/>Wind Speed: {`${speed.toFixed()} km/h`}</span>
            </div>
        </div>
        <div className="flex flex-row items-center justify-between space-x-2e text-sm py-3 ">
        <FontAwesomeIcon icon={faSun} />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")} 
          </span>
        </p>
        <p className="font-light">|</p>

        <FontAwesomeIcon icon={faSun} />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
            
          </span>
        </p>
        <p className="font-light">|</p>

        <FontAwesomeIcon icon={faArrowUp} />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>

        <FontAwesomeIcon icon={faArrowDown} />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  )
}
