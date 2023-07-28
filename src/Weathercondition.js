import { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {v4} from "uuid";
export default function Weather({ cityname }) {
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherobject,setweatherObject]=useState([]);
  const [city,setCity]=useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3bf7affa17msh2739ce2e14b0560p1a299cjsn6a120a79dafb",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };
    fetch(
      `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityname}`,
      options
    )
      .then((response) => {
        if (!response.ok) {
          let errorObj = new Error("HTTP Error Occurred:" + response.status);
          throw errorObj;
        }
        return response.json();
      })
      .then((actualData) => {
        setWeather(actualData);
        setweatherObject([...weatherobject, actualData]);
        setCity([...city,cityname]);
      })
      .catch((err) => {
        setError(err.message);
        setWeather(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cityname]);
  return (<>
  {loading&&<div className="text-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>}
    {error &&(<div className="text-bg-danger fs-5 text-center">{`There is a problem in loading the City data: ${error}`}</div>)} 
    {(!loading && !error)&&
    <div>
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
      <div className="col">
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3 text-bg-primary">
            <h4 className="my-0 fw-normal">Temperatures</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title"><small className="text-body-secondary fw-semibold">{weather.max_temp} °C</small></h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>Temperature is {weather.temp}</li>
              <li>Min Temperature is {weather.min_temp}</li>
              <li>EMax Temperature is {weather.max_temp}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3 text-bg-primary">
            <h4 className="my-0 fw-normal">Humidity Info</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title"><small className="text-body-secondary fw-semibold">{weather.humidity} %</small></h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>Wind Degree is {weather.wind_degrees}</li>
              <li>Feels Like is {weather.feels_like}</li>
              <li>Humidity is {weather.humidity}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card mb-4 rounded-3 shadow-sm border-primary">
          <div className="card-header py-3 text-bg-primary border-primary">
            <h4 className="my-0 fw-normal">Wind Info</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title"><small className="text-body-secondary fw-semibold">{weather.wind_speed} Km/Hr</small></h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>Wind Speed is {weather.wind_speed}</li>
              <li>Sunrise time is {weather.sunrise}</li>
              <li>Sunset time is {weather.sunset}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="table-responsive">
    <table className="table caption-top border-2 border-black">
  <caption className="text-center fs-1 fw-semibold text-dark">Past searches result</caption>
  <thead>
    <tr>
      <th scope="col">City name</th>
      <th scope="col">Cloud_pct</th>
      <th scope="col">Feels_like</th>
      <th scope="col">Humidity</th>
      <th scope="col">Max_temp</th>
      <th scope="col">Min_temp</th>
      <th scope="col">Sunrise</th>
      <th scope="col">Sunset</th>
      <th scope="col">Temperature</th>
      <th scope="col">Wind Degree</th>
      <th scope="col">Wind Speed</th>
    </tr>
  </thead>
  <tbody>
   
      {weatherobject && weatherobject.map((data,index)=>(
         <tr key={v4()}>
           <th scope="row">{city[index]}</th>
           <td>{data.cloud_pct}</td>
           <td>{data.feels_like}</td>
           <td>{data.humidity}</td>
           <td>{data.max_temp}</td>
           <td>{data.min_temp}</td>
           <td>{data.sunrise}</td>
           <td>{data.sunset}</td>
           <td>{data.temp}</td>
           <td>{data.wind_degrees}</td>
           <td>{data.wind_speed}</td>
           </tr>
      ))}
    
  </tbody>
</table></div>

</div>}
    </>
  );
  
}
