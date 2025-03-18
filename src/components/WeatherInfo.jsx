import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({ city, visible, position, theme }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = '7fac6c191bb6eafb30a9f72fa3a18351';

  useEffect(() => {
    if (visible && city) {
      setLoading(true);
      setError(null);
      
      axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          units: 'metric',
          appid: API_KEY
        }
      })
        .then(response => {
          const data = response.data;
          setWeather({
            temp: Math.round(data.main.temp),
            description: data.weather[0].main,
            icon: data.weather[0].icon
          });
        })
        .catch(error => {
          setError(error.response?.data?.message || 'Weather data not available');
          console.error('Error fetching weather:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city, visible]);

  if (!visible) return null;

  return (
    <div 
      className={`fixed transform -translate-x-1/2
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} 
        ${theme === 'dark' ? 'text-white' : 'text-black'}
        shadow-lg rounded-lg p-3 z-50 min-w-[200px] text-center`}
      style={{
        left: `${position.x}px`,
        top: `${position.y + 20}px`
      }}
    >
      {loading && <div>Loading weather...</div>}
      {error && <div className="text-red-500">Unable to load weather</div>}
      {weather && !loading && !error && (
        <div className="flex items-center justify-center gap-2">
          <img 
            src={`http://openweathermap.org/img/w/${weather.icon}.png`}
            alt={weather.description}
            className="w-8 h-8"
          />
          <span>{`${city}, ${weather.temp}°C, ${weather.description}`}</span>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;