/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './src/components/HomeScreen';
import DetailsScreen from './src/components/DetailsScreen';
import {getWeather} from './src/store/actions/weather';
import {useDispatch} from 'react-redux';
import {INITIAL_CITY} from './src/store/constants';
import {Image} from 'react-native';

const Tabs = createBottomTabNavigator();

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWeather(INITIAL_CITY));
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/home.png')}
                style={{width: 20, height: 20}}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/search.png')}
                style={{width: 20, height: 20}}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
