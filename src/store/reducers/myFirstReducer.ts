import {
  CLOSE_SECTION,
  GET_FORECAST_WEATHER_SUCCESS,
  OPEN_SECTION,
} from '../constants';

const myFirstReducer = (
  state = {forecastWeather: [], openTabs: []},
  actions: any,
) => {
  switch (actions.type) {
    case GET_FORECAST_WEATHER_SUCCESS:
      return {
        ...state,
        forecastWeather: actions.forecastWeather,
      };

    case OPEN_SECTION:
      return {
        ...state,
        openTabs: [...state.openTabs, actions.payload],
      };

    case CLOSE_SECTION:
      const index = state.openTabs.findIndex(tab => tab === actions.payload);
      const data = [
        ...state.openTabs.slice(0, index),
        ...state.openTabs.slice(index + 1),
      ];

      return {
        ...state,
        openTabs: data,
      };

    default:
      return state;
  }
};

export default myFirstReducer;
