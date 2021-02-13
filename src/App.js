import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const info = {
  key: 'c6cf35300cb54c4ef7da1c2fa07c88bc',
  baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

function App() {
  const [zip, setZip] = useState('');
  const [temp, setTemp] = useState('');
  const [realFeel, setRealFeel] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [cloudCover, setCloudCover] = useState('');
  const [humidity, setHumidity] = useState('');
  const [city, setCity] = useState('');

  const search = (event) => {
    if(event.key === 'Enter') {
      axios.get(
        info.baseUrl,
        {
          params: {
            zip: zip,
            appid: info.key
          }
        }
      ).then(res => {
        // temp is given in Kelvin, so convert to Fahrenheit
        let tempKelvin = parseFloat(res.data.main.temp);
        let tempFahrenheit = convertToFahrenheit(tempKelvin);

        let realFeelKelvin = parseFloat(res.data.main.feels_like);
        let realFeelFahrenheit = convertToFahrenheit(realFeelKelvin);

        // wind speed is given in meters per second, so convert to mph
        let windSpeedMph = Math.round(parseFloat(res.data.wind.speed) * 2.237);

        setTemp(tempFahrenheit + ' ॰F');
        setRealFeel(realFeelFahrenheit + ' ॰F');
        setWindSpeed(windSpeedMph + ' mph');
        setCloudCover(res.data.clouds.all + '%');
        setHumidity(res.data.main.humidity + '%');
        setCity('Showing weather for ' + res.data.name);
      }).catch(err => {
        setTemp('Could not find temperature for this location');
      });
    }
  }

  const convertToFahrenheit = (tempKelvin) => {
    
    return Math.round((tempKelvin - 273.15) * (9 / 5) + 32);
  }

  return (
    <div className="app mt-5 text-center">
      <h1><b>⛅ Weather ⚡</b></h1>
      <br />
      <input 
        type="number"
        placeholder="Zip code..."
        onChange={event => setZip(event.target.value)} 
        value={zip}
        onKeyPress={search}
      />
      <p>Press enter to search</p>
      <hr />
      <h2><b><u>{city}</u></b></h2>
      <h3 className="mt-4"><b>Actual Temperature</b></h3>
      <h4>{temp}</h4>
      <h3 className="mt-4"><b>Feels Like</b></h3>
      <h4>{realFeel}</h4>
      <h3 className="mt-4"><b>Wind Speed</b></h3>
      <h4>{windSpeed}</h4>
      <h3 className="mt-4"><b>Cloud Cover</b></h3>
      <h4>{cloudCover}</h4>
      <h3 className="mt-4"><b>Humidity</b></h3>
      <h4>{humidity}</h4>
    </div>
  );
}

export default App;
