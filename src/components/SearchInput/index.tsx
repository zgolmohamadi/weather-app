import { useState } from "react";
import { faLocation, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UnitType } from "../../type/weather";
import toast from "react-hot-toast";
import { getIp } from "../../services/locationService";

type SearchInputTypes = {
  setUnit: (param: UnitType) => void;
  setQuery: (param: Record<string, string | number>) => void;
  unit: UnitType;
};

function SearchInput({ unit, setUnit, setQuery }: SearchInputTypes) {
  const [city, setCity] = useState("");

  const handleUnitChanges = (e) => {
    const selectedUnit = e.target.name;
    if (unit !== selectedUnit) setUnit(selectedUnit);
  };

  const onSearchClickHandle = () => {
    toast("Fetching users location.", { position: "top-right" });

    if (city) setQuery({ q: city });
  };

  const getLocation = async () => {
    const data = await getIp();

    const lat = data.geoplugin_latitude;
    const lon = data.geoplugin_longitude;

    setQuery({
      lat,
      lon,
    });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.success("Location fetched!");

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setQuery({
            lat,
            lon,
          });
        },
        () => {
          getLocation();

        }
      );
    }
  };

  return (
    <div className="px-0 sm:px-5 flex w-full items-center  md:flex-row flex-col">
      <div className="flex w-full items-center justify-between">
        <input
          value={city}
          type="text"
          placeholder="Search for city..."
          className="text-lg capitalize p-2 focus:outline-none border-0 flex-1"
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="ml-4">
          <button
            type="button"
            className="border-none bg-transparent w-6 h-6"
            onClick={onSearchClickHandle}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="text-white cursor-pointer transition ease-out hover:scale-125"
            />
          </button>
          <button
            type="button"
            className="border-none bg-transparent w-6 h-6"
            onClick={handleLocationClick}
          >
            <FontAwesomeIcon
              icon={faLocation}
              className="text-white cursor-pointer transition ease-out hover:scale-125"
            />
          </button>
        </div>
      </div>

      <div className="inline-flex items-center justify-center ml-5 text-white sm:mt-0 mt-5">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitChanges}
        >
          °C
        </button>
        <span className="text-xl text-white mx-1">|</span>
        <button
          name="imperial"
          onClick={handleUnitChanges}
          className="text-xl text-white font-light transition ease-out hover:scale-125"
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
