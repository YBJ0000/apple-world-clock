import React, { useState } from 'react';
import Clock from './components/Clock';
import GlobalTimeFormatToggle from './components/GlobalTimeFormatToggle';
import './index.css';

function App() {
  const [globalTheme, setGlobalTheme] = useState('light');
  const clocks = [
    { id: 1, city: 'Beijing', timezone: 8 },
    { id: 2, city: 'New York', timezone: -4 },
    { id: 3, city: 'London', timezone: 1 },
    { id: 4, city: 'Sydney', timezone: 11 },
  ];

  const handleGlobalTimeFormatChange = (newFormat) => {
    window.location.reload();
  };

  const toggleGlobalTheme = () => {
    setGlobalTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col justify-center
      ${globalTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold text-center flex-1
            ${globalTheme === 'dark' ? 'text-white' : 'text-black'}`}>
            World Clock
          </h1>
          <button
            onClick={toggleGlobalTheme}
            className={`px-4 py-2 rounded-full transition-colors duration-300
              ${globalTheme === 'dark' 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-200 text-black hover:bg-gray-300'}`}
          >
            {globalTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        
        <div className="flex justify-center mb-4">
          <GlobalTimeFormatToggle 
            cities={clocks.map(clock => clock.city)}
            onToggle={handleGlobalTimeFormatChange}
          />
        </div>
        
        <div className="flex flex-wrap justify-center">
          {clocks.map((clock) => (
            <Clock 
              key={clock.id}
              city={clock.city}
              timezone={clock.timezone}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
