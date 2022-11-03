import React, {useState} from 'react';
import {Get} from './http';
import timeFormat from './util';
import './App.css';
import Header from './Header';
import Icon from './Icon';
import Search from './Search';
import Forecast from './Forecast';
const keyApi = "25ade75d5d7f46f6bbf3bd04a072667b";
export default function App() {
  const [weatherData, setWeatherData] = useState({ready:false});
  const [city,setCity] = useState('南昌');
  function changeDisplay() {
    gatherData();
  }
  function updateCity(value) {
    console.log(value);
    setCity(value);
  }
  function handleResponse(response) {
    console.log(response);
    const currentWeather=response[1].now;
    const futherWeather = response[0].daily;
    console.log(timeFormat(currentWeather.obsTime, 'EEE HH:MM'));
    setWeatherData({
      ready: true,
      city: city,
      icon: currentWeather.text,
      date: timeFormat(currentWeather.obsTime,'EEE HH:MM'),
      currentWeather: currentWeather,
      futherWeather: futherWeather,
    })
  }
  function gatherData() {
    let cityid = `https://geoapi.qweather.com/v2/city/lookup?location=${city}&key=${keyApi}&number=1`;
    Get(cityid).then(res => {
      let cityid = res.location[0].id;
      let weather = `https://devapi.qweather.com/v7/weather/3d?location=${cityid}&key=${keyApi}`;
      let now = `https://devapi.qweather.com/v7/weather/now?location=${cityid}&key=${keyApi}`;
      Promise.all([Get(weather),Get(now)]).then(handleResponse);
    })
  }
  if(weatherData.ready){
    return (
      <div className="App">
        <div className="container">
          <Header data={weatherData}/>
          <Icon data={weatherData} />
          <Search
            onHandleSubmit={changeDisplay}
            autoFocus="on"
            onHandleChange={updateCity} />
          <Forecast data={weatherData.futherWeather} />
        </div>
      </div>
    );
  } else {
    gatherData();
    return 'Loading...'
  }
}

