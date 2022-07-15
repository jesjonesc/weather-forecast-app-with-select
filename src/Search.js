import React, {useState, useCallback, useMemo, CSSProperties, useEffect } from 'react';
import GridLoader from "react-spinners/GridLoader";
import DatalistInput, {startsWithValueFilter} from 'react-datalist-input';
import axios from "axios";
import cities from "cities.json";
import CurrentWeather from "./CurrentWeather";
import Forecast from './Forecast';
import 'react-datalist-input/dist/styles.css';
import "./Search.css";



export default function Search() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)"
  };
  let [loaded, setLoaded] = useState(false);
  let [value, setValue] = useState('');
  let [city, setCity] = useState(null);
  let [units, setUnits] = useState("metric");
  
  function showCity(response){
    setCity([response.data.lat, response.data.lon]);
  }
  function showCurrentLocation() {
    let apiKey = `RwmHPc7UO6BPu8h9UQkb`;
    let apiUrl = `https://extreme-ip-lookup.com/json/?key=${apiKey}`
    axios.get(apiUrl).then((showCity));
    axios.get(apiUrl).catch((data, status) => {
      console.log("Something went wrong");
    });
  }
  function handleCurrentLocation(event){
    event.preventDefault();
    showCurrentLocation();
  }
  function showFahrenheit (event){
    event.preventDefault();
    setUnits("imperial");
  }
  function showCelsius (event){
    event.preventDefault();
    setUnits("metric");
  }
  
  const items = useMemo(
    () =>
      cities.map((city,index) => ({
        id: index,
        value: `${city.name}, ${city.country}`,
        lng: city.lng,
        lat: city.lat
      })),
    [],
  );
  if(city===null){
    showCurrentLocation();
  }
  useEffect(()=>{
    setTimeout(()=>{
      setLoaded(true)
    },500)},[city]) 
  const limitOptionsFilter: Filter = useCallback((items, value) => items.slice(0, 10), []);
  const filters = [startsWithValueFilter,limitOptionsFilter] ;
  if (loaded) {
    return (
    <div>
      <div className="searchBox">
        <div className="scale">
          <a href="/" onClick={showFahrenheit}>°F</a>
          <span> | </span>
          <a href="/" onClick={showCelsius}>°C</a>
        </div>
        <div className='search'>
          <DatalistInput
              value={value}
              setValue={setValue}          
              placeholder="Start entering the city"
              items={items}
              filters={filters}
              onSelect={(item) => {
                setCity([item.lat,item.lng]);
                setValue("");
              }}
            />
            <a href="/" onClick={handleCurrentLocation}>Show current location weather</a>
        </div>
          
      </div>
      <CurrentWeather city={city} units={units}/>
      <Forecast city={city} units={units}/>
    </div>
  );
}else{
  return null;
}
}
