import React from "react"
import { MONTHS, DAYS } from "./DateFormat";
import WeatherIcon from "./WeatherIcon"

const unitsMapping = {
  "imperial": "°F",
  "metric": "°C"
}
export default function  ForecastDay (props) {
    function day(){
        const date = new Date(props.data.dt*1000);
        return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`;
    }
    let temp = Math.round(props.data.temp.day);
    let temp_min = Math.round(props.data.temp.min);
    let temp_max = Math.round(props.data.temp.max);
    if (props.units === "imperial") {
      temp = Math.round(temp*1.8+32); 
      temp_max = Math.round(temp_max*1.8+32); 
      temp_min = Math.round(temp_min*1.8+32)
    }
    return <div className="col-auto">
            <div className="forecast shadow">
              <h6 className="week-day">{day()}</h6>
              <h2>
                <span className="temperature forecast-temp">{temp}</span
                ><span className="temperature-scale">{unitsMapping[props.units]}</span>
              </h2>
              <span className="weather-icon"><WeatherIcon icon={props.data.weather[0].icon} color={"#BFB48F"} size={40} /></span>
              <p>
                Max: {temp_max}<span className="temperature-scale">{unitsMapping[props.units]}</span> <br />

                Min: {temp_min}<span className="temperature-scale">{unitsMapping[props.units]}</span> <br />

                Wind: {Math.round(props.data.wind_speed)} km/h
              </p>
            </div>
          </div>
}