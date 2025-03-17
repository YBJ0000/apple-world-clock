import React from 'react';

const ClockHand = ({ 
  angle = 0, 
  length = 50, 
  width = 2, 
  color = 'bg-black',
  tailLength = 0 
}) => {
  return (
    <div 
      className={`absolute origin-bottom ${color} rounded-full`}
      style={{
        height: `${length}%`,
        width: `${width}px`,
        transform: `rotate(${angle}deg) translateY(-${tailLength}px)`,
        transformOrigin: 'bottom center',
        bottom: '50%',
        left: 'calc(50% - ${width/2}px)'
      }}
    />
  );
};

export default ClockHand;