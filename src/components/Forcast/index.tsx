import { iconUrlFromCode } from "../../services/weatherService";
import { ForcastItemType } from "../../type/weather";


type ForcastPropType = {
  title: string;
  items: ForcastItemType[];
};

export default function Forcast({ title, items }: ForcastPropType) {
  return (
    <div className="w-full text-white">
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
