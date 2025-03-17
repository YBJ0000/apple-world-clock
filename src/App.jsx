import React from 'react';
import Clock from './components/Clock';
import './index.css';

function App() {
  const clocks = [
    { id: 1, city: 'Beijing', timezone: 8 },
    { id: 2, city: 'New York', timezone: -4 },
    { id: 3, city: 'London', timezone: 1 },
    { id: 4, city: 'Sydney', timezone: 11 },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex flex-col justify-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
          World Clock
        </h1>
        
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
