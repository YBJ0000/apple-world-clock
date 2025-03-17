import React from 'react';

const Center = ({ theme = 'light' }) => {
  return (
    <div className={`absolute w-3 h-3 rounded-full z-50 ${
      theme === 'dark' ? 'bg-white' : 'bg-black'
    }`} />
  );
};

export default Center;