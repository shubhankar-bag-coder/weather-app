import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {

  const [eror,SetError]=useState(null)

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

      } catch (error) {
        console.log(error)
      }
    };

  

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
