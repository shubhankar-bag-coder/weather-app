import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

import WeatherInfo from './Components/WeatherInfo'

import UnitsPicker from './Components/UnitsPicker';


const WEATHER_API_KEY='5d6362416ef134444328e41138d18f8d';
const BASE_WEATHER_CALL='https://api.openweathermap.org/data/2.5/weather?';

export default function App() {

  const [Error,SetError]=useState(null);
  const [currentWeather,setcurrentWeather]=useState(null);
  const [unitSystem,SetunitSystem]=useState('imperial')

  useEffect( ()=>{
    load()
  },[] )

    async function load(){
      try {
        let {status}= await Location.requestPermissionsAsync()

        if( status != 'granted'){
          SetError('Access is reqiured to run the App');
          return
        }
        const location=await Location.getCurrentPositionAsync()
        
        
        const { latitude,longitude }=location.coords;
        alert(`Latitude:${latitude} and Longitude:${longitude}`)
        
        const WeatherUrl=`${BASE_WEATHER_CALL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;
        const response=await fetch(WeatherUrl);
        const result=await response.json();

        if(response.ok){
          setcurrentWeather(result);
        }else{
          SetError(result.message);
        }

      } catch (error) {
        // console.log(error)
        SetError(error);
      }
    };

    if(currentWeather){
      const{ main: { temp }, }=currentWeather
      return(

          <View style={styles.container}>
            <StatusBar style="auto" />
            <View styles={styles.main}>
              <UnitsPicker/>
              <WeatherInfo currentWeather={currentWeather}/>
            </View>
          </View>

        ) } else{
          return(
                <View style={styles.container}>
                <Text> {Error} </Text>
                <StatusBar style="auto" />
                </View>
          )
        }

  

  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',


    // backgroundColor: '#fff',
    // alignItems: 'center',
  },main:{
    flex:1,
    justifyContent:'center',
  }
});
