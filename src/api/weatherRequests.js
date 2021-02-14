import axios from 'axios';

const info = {
    key: 'c6cf35300cb54c4ef7da1c2fa07c88bc',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
  }

const convertToFahrenheit = (tempKelvin) => {
    return Math.round((tempKelvin - 273.15) * (9 / 5) + 32);
}

export const getCurrentWeather = async (zip) => {
    return axios.get(
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

        return {
          tempFahrenheit: tempFahrenheit,
          realFeelFahrenheit: realFeelFahrenheit,
          windSpeedMph: windSpeedMph,
          cloudCover: res.data.clouds.all,
          humidity: res.data.main.humidity,
          city: res.data.name
        };
      }).catch(err => {
        return {
          error: 'Enter a valid zip code'
        };
      });
}
