import './App.css';
import { fetchWeather } from './api/fetchWeather';
import { useState } from 'react';

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
      <input type="text" placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search}/>
      {weather.main && (
        <div>
          <div>
            {Math.round(weather.main.temp)}
            <span>&deg;C</span>
          </div>
          <div>{weather.name}</div>
          <div>{weather.sys.country}</div>
        </div>
      )}
    </div>
  );
}

export default App;