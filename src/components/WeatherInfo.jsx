import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({ city, visible, position, theme }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

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
      className={`fixed
        backdrop-blur-xl bg-opacity-80
        ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} 
        ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
        shadow-lg rounded-3xl p-4 z-50 min-w-[180px]
        border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}
      style={{
        left: `${position.x + 190}px`, // 让天气组件右移不挡住表盘，避免点击后立马闪退
        top: `${position.y}px`,
        transform: 'translateY(-50%)'
      }}
    >
      <div className="space-y-2 min-h-[100px] flex flex-col justify-center">
        {loading && (
          <div className="text-sm font-medium text-center">Loading weather...</div>
        )}
        {error && (
          <div className="text-red-500 text-sm font-medium text-center">{error}</div>
        )}
        {weather && !loading && !error && (
          <>
            <div className="text-lg font-semibold">{city}</div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-light">{weather.temp}°</span>
              <img 
                src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                alt={weather.description}
                className="w-12 h-12"
              />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {weather.description}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherInfo;