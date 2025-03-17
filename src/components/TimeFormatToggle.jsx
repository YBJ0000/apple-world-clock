import React, { useState } from 'react';

const TimeFormatToggle = ({ cityId, onChange, theme = 'light' }) => {
  const [is24Hour, setIs24Hour] = useState(
    localStorage.getItem(`timeFormat-${cityId}`) !== 'false'
  );

  const toggleTimeFormat = () => {
    const newFormat = !is24Hour;
    setIs24Hour(newFormat);
    localStorage.setItem(`timeFormat-${cityId}`, newFormat);
    onChange(newFormat);
  };

  return (
    <button
      onClick={toggleTimeFormat}
      className={`mt-2 px-3 py-1 text-xs rounded-full 
        ${theme === 'dark' 
          ? 'bg-gray-800 text-white hover:bg-gray-700' 
          : 'bg-gray-200 text-black hover:bg-gray-300'}`}
    >
      {is24Hour ? '12-Hour' : '24-Hour'}
    </button>
  );
};

export default TimeFormatToggle;