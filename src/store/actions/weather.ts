import {CLOSE_SECTION, GET_FORECAST_WEATHER, OPEN_SECTION} from '../constants';

export const getWeather = (city: string) => ({
  type: GET_FORECAST_WEATHER,
  payload: city,
});

export const openTab = (tab: string) => ({
  type: OPEN_SECTION,
  payload: tab,
});

export const closeTab = (tab: string) => ({
  type: CLOSE_SECTION,
  payload: tab,
});
