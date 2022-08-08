/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';

import configureStore from './src/store/configureStore';
import {Provider} from 'react-redux';

const reduxStore = configureStore();

const RNRedux = () => (
  <Provider store={reduxStore}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
