import './App.css';
import { fetchWeather } from './api/fetchWeather';
import { useState } from 'react';

const DESCRIPCIONES = {
  "clear sky": "Cielo despejado",
  "few clouds": "Parcialmente Nublado",
  "scattered clouds": "Nublado",
  "broken clouds": "Nublado",
  "shower rain": "Lluvia",
  "rain": "Lluvia",
  "heavy intensity rain": "Tormenta",
  "thunderstorm": "Tormenta eléctrica",
  "snow": "Nieve",
  "mist": "Niebla",
  "smoke": "Niebla",
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);
      setQuery('');
      setWeather(data);
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <input className='buscador' type="text" placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search}/>
        {weather.main && (
          <div className='weather-card'>
            <div className='temperatura'>
              {Math.round(weather.main.temp)}
              <span>&deg;C</span>
            </div>
            <div className='clima'>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].main}`} />
              <span>{DESCRIPCIONES[weather.weather[0].description]}</span>
            </div>
            <div className='ubicacion'>
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;