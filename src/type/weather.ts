export type current_weather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: string;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type ForcastType={
  title:string,
  temp: number,
  icon: string,
}

export type WeatherType={
  timezone: string,
  daily: ForcastType[],
  hourly: ForcastType[],
  lat: number,
  lon: number;
  temp: number;
  feels_like: string;
  temp_min: number;
  temp_max: number;
  humidity: number;
  name: string;
  dt: string;
  country: string;
  sunrise: string;
  sunset: string;
  details: string;
  icon: string;
  speed: number;
}

export type UnitType='metric' | 'imperial' | 'standard'