import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { getCurrentWeather } from './api/weatherRequests';

function App() {
  const [zip, setZip] = useState('');
  const [isValidZip, setIsValidZip] = useState(false);
  const [temp, setTemp] = useState('');
  const [realFeel, setRealFeel] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [cloudCover, setCloudCover] = useState('');
  const [humidity, setHumidity] = useState('');
  const [city, setCity] = useState('');

  const search = (event) => {
    if(event.key === 'Enter') {
      getCurrentWeather(zip).then(res => {
        if(res.error) {
          setIsValidZip(false);
        }
        else {
          setIsValidZip(true);
          setTemp(res.tempFahrenheit);
          setRealFeel(res.realFeelFahrenheit);
          setWindSpeed(res.windSpeedMph);
          setCloudCover(res.cloudCover);
          setHumidity(res.humidity);
          setCity(res.city);
        }
      });
    }
  }

  const getDisplayInfo = () => {
    if(isValidZip) {
      return (
        <div>
          <h2><b><u>{city}</u></b></h2>
          <h3 className="mt-4"><b>Actual Temperature</b></h3>
          <h4>{temp + ' ॰F'}</h4>
          <h3 className="mt-4"><b>Feels Like</b></h3>
          <h4>{realFeel + ' ॰F'}</h4>
          <h3 className="mt-4"><b>Wind Speed</b></h3>
          <h4>{windSpeed + ' mph'}</h4>
          <h3 className="mt-4"><b>Cloud Cover</b></h3>
          <h4>{cloudCover + '%'}</h4>
          <h3 className="mt-4"><b>Humidity</b></h3>
          <h4>{humidity + '%'}</h4>
        </div>
      );
    }
    else {
      return <h3><b>Enter a valid zip code</b></h3>;
    }
  }

  return (
    <div className="app pt-5 text-center">
      <h1 className="mb-0"><b>⛅ Weather ⚡</b></h1>
      <br />
      <input 
        type="number"
        placeholder="Zip code..."
        onChange={event => setZip(event.target.value)} 
        value={zip}
        onKeyPress={search}
        className="form-control ml-auto mr-auto"
      />
      <p className="pt-2">Press enter to search</p>
      <hr />
      {getDisplayInfo()}
    </div>
  );
}

export default App;
