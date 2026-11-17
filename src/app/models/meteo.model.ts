export interface CityInfo {
  name: string;
  country: string;
  latitude: string;
  longitude: string;
  elevation: string;
  sunrise: string;
  sunset: string;
}

export interface CurrentCondition {
  date: string;
  hour: string;
  tmp: number;
  wnd_spd: number;
  wnd_gust: number;
  wnd_dir: string;
  pressure: number;
  humidity: number;
  condition: string;
  condition_key: string;
  icon: string;
  icon_big: string;
}
export interface ForecastDay {
  date: string;
  day_short: string;
  day_long: string;
  tmin: number;
  tmax: number;
  condition: string;
  condition_key: string;
  icon: string;
  icon_big: string;
  hourly_data: Record<string, unknown>;
}

export interface MeteoResponse {
  city_info: CityInfo;
  current_condition: CurrentCondition;
  fcst_day_0: ForecastDay;
  fcst_day_1: ForecastDay;
  fcst_day_2: ForecastDay;
  fcst_day_3: ForecastDay;
  fcst_day_4: ForecastDay;
}
