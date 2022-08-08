import {takeEvery, call, put} from 'redux-saga/effects';
import {GET_FORECAST_WEATHER, GET_FORECAST_WEATHER_SUCCESS} from './constants';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'fa6d558f3dmshd7c83074cf75f9bp15d57bjsn0f8af43808c0',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  },
};

function forecastWeatherFetch(city: string) {
  return fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=5`,
    options,
  ).then(response => response.json());
}

function* getForecastWeatherFetch(action: any) {
  // @ts-ignore
  const forecastWeather = yield call(() =>
    forecastWeatherFetch(action.payload),
  );
  yield put({type: GET_FORECAST_WEATHER_SUCCESS, forecastWeather});
}

function* mySaga() {
  yield takeEvery(GET_FORECAST_WEATHER, getForecastWeatherFetch);
}

export default mySaga;
