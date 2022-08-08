import {Button, Image, SectionList, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getWeather} from '../store/actions/weather';
import * as React from 'react';
import styled from 'styled-components';

const DetailsScreen = () => {
  const dispatch = useDispatch();
  const weather = useSelector(
    (state: any) => state?.myFirstReducer.forecastWeather,
  );

  const [city, setCity] = useState('');
  const [sectionData, setSectionData] = useState();

  const getCityWeather = () => {
    dispatch(getWeather(city));
  };

  useEffect(() => {
    const getSectionData = () => {
      return weather?.forecast?.forecastday.map(
        (forecast: {date: string; day: any}) => {
          return {
            title: forecast.date,
            data: [forecast.day],
          };
        },
      );
    };

    setSectionData(getSectionData());
  }, [weather]);

  const renderItem = ({item}: any) => {
    const iconURL = item.condition.icon.slice(2);

    return (
      <View>
        <FirstRow>
          <PlainText>Max temp: {item.maxtemp_c}</PlainText>
          <PlainText>Min temp: {item.mintemp_c}</PlainText>
        </FirstRow>

        <SecondRow>
          <Image
            style={{width: '20%', height: '50%'}}
            source={{uri: `https://${iconURL}`}}
          />
          <View>
            <PlainText>Temperature: {item.avgtemp_c}</PlainText>
            <PlainText>Chance of rain: {item.daily_chance_of_rain}</PlainText>
          </View>
        </SecondRow>
      </View>
    );
  };

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => (
    <SectionHeader>
      <Title>{title}</Title>
    </SectionHeader>
  );

  return (
    <LimitedView>
      <CustomInput onChangeText={setCity} placeholder="Enter the city" />
      <Button title="Get Weather" onPress={getCityWeather} />

      {weather?.error?.message ? (
        <PlainText>{weather?.error?.message}</PlainText>
      ) : null}

      {sectionData ? (
        <>
          <CityName>{weather?.location?.name}</CityName>
          <SectionList
            keyExtractor={(item, index) => item + index}
            sections={sectionData}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={false}
          />
        </>
      ) : null}
    </LimitedView>
  );
};

const PlainText = styled(Text)({
  fontSize: 16,
  padding: 5,
  fontWeight: '600',
});

const CityName = styled(Text)({
  fontSize: 25,
  color: '#0096FF',
});

const Title = styled(Text)({
  fontSize: 18,
});

const SectionHeader = styled(View)({
  paddingTop: 16,
  paddingBottom: 10,
  borderBottomWidth: 1,
  borderBottomColor: 'grey',
});

const SecondRow = styled(View)({
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  height: '80px',
});

const FirstRow = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  paddingTop: 15,
});

const LimitedView = styled(View)({
  flex: 1,
  paddingHorizontal: 16,
});

const CustomInput = styled(TextInput)({
  height: 40,
  marginVertical: 12,
  borderWidth: 1,
  padding: 10,
  borderRadius: 15,
});

export default DetailsScreen;
