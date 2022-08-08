import * as React from 'react';
import {
  View,
  Text,
  Animated,
  Pressable,
  Image,
  ScrollView,
  StyleProp,
} from 'react-native';
import styled from 'styled-components';
import {connect, useDispatch, useSelector} from 'react-redux';
import {useEffect, useState, useRef, FC} from 'react';
import {closeTab, openTab} from '../store/actions/weather';

type FadeInViewProps = {
  index: string;
  children: React.ReactElement | null;
  style?: StyleProp<any>;
};

const HEIGHT_ANIMATION_DURATION = 300;
const OPACITY_ANIMATION_DURATION = 1000;

const FadeInView: FC<FadeInViewProps> = props => {
  const openTabs = useSelector((state: any) => state?.myFirstReducer?.openTabs);

  const heightAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const displayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (openTabs.includes(props.index)) {
      showMore();
    } else {
      showLess();
    }
  }, [openTabs, props.index]);

  const showLess = () => {
    Animated.timing(displayAnim, {
      toValue: 0,
      duration: 10,
      useNativeDriver: false,
    }).start();
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: HEIGHT_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const showMore = () => {
    Animated.timing(displayAnim, {
      toValue: 1,
      duration: OPACITY_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
    Animated.timing(heightAnim, {
      toValue: 150,
      duration: HEIGHT_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        height: heightAnim,
        opacity: displayAnim,
        // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

const HomeScreen = () => {
  const dispatch = useDispatch();
  const weather = useSelector(
    (state: any) => state?.myFirstReducer?.forecastWeather,
  );
  const openTabs = useSelector((state: any) => state?.myFirstReducer?.openTabs);
  const [forecast, setForecast] = useState(weather?.forecast?.forecastday);

  useEffect(() => {
    setForecast(weather?.forecast?.forecastday);
  }, [weather]);

  const handleShowMore = (date: string) => {
    dispatch(openTab(date));
  };

  const handleShowLess = (date: string) => {
    dispatch(closeTab(date));
  };

  const renderForecastCalendar = (item: any) => {
    if (!item) {
      return null;
    }

    const getDate = (date: Date) => {
      const currentItem = new Date(date);
      return currentItem.toDateString();
    };

    return item.map((day: any) => {
      const isOpenTab = openTabs.includes(day.date);
      const iconUrl = day?.day?.condition?.icon.slice(2);
      return (
        <ListItem
          key={day.date}
          onPress={
            isOpenTab
              ? () => handleShowLess(day.date)
              : () => handleShowMore(day.date)
          }>
          <PlainText>{getDate(day.date)}</PlainText>
          <PlainText>Average Temp: {day.day.avgtemp_c}</PlainText>

          <View style={{position: 'absolute', right: 10, top: 10}}>
            <ActionText>{isOpenTab ? 'Show Less' : 'Show More'}</ActionText>
          </View>

          <FadeInView index={day.date}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{
                  width: '20%',
                  height: '50%',
                  alignSelf: 'center',
                }}
                source={{uri: `https://${iconUrl}`}}
              />
              <View>
                <PlainText>Max temp: {day?.day?.maxtemp_c}</PlainText>
                <PlainText>Min temp: {day?.day?.mintemp_c}</PlainText>
                <PlainText>
                  Average Temperature: {day?.day?.avgtemp_c}
                </PlainText>
                <PlainText>
                  Chance of rain: {day?.day.daily_chance_of_rain}
                </PlainText>
              </View>
            </View>
          </FadeInView>
        </ListItem>
      );
    });
  };

  return (
    <LimitedView>
      <ScrollView>
        <CityName>{weather?.location?.name}</CityName>
        {renderForecastCalendar(forecast)}
      </ScrollView>
    </LimitedView>
  );
};

const ActionText = styled(Text)({
  fontSize: 14,
  color: 'grey',
});

const PlainText = styled(Text)({
  fontSize: 16,
  padding: 5,
  fontWeight: '600',
});

const LimitedView = styled(View)({
  flex: 1,
  marginTop: 25,
  paddingHorizontal: 15,
});

const ListItem = styled(Pressable)({
  flex: 1,
  marginTop: 22,
  paddingHorizontal: 15,
  alignItems: 'flex-start',
  justifyContent: 'center',
  borderWidth: 1,
  borderRadius: 10,
  borderColor: 'grey',
});

const CityName = styled(Text)({
  fontSize: 25,
  color: '#0096FF',
});

export default connect()(HomeScreen);
