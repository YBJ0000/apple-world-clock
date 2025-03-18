import React, { useState } from 'react';

const GlobalTimeFormatToggle = ({ cities, onToggle }) => {
  const [isGlobal24Hour, setIsGlobal24Hour] = useState(
    localStorage.getItem('globalTimeFormat') !== 'false'
  );

  const toggleGlobalTimeFormat = () => {
    const newFormat = !isGlobal24Hour;
    setIsGlobal24Hour(newFormat);
    
    // 更新所有城市的时间格式
    cities.forEach(city => {
      localStorage.setItem(`timeFormat-${city}`, newFormat);
    });
    
    localStorage.setItem('globalTimeFormat', newFormat);
    onToggle(newFormat);
  };

  return (
    <button
      onClick={toggleGlobalTimeFormat}
      className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 mb-0"
    >
      Global {isGlobal24Hour ? '12-Hour' : '24-Hour'}
    </button>
  );
};

export default GlobalTimeFormatToggle;