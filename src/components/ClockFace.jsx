import React from 'react';
import Center from './Center';
import ClockHand from './ClockHand';

const ClockFace = ({ 
  hourDeg = 0, 
  minuteDeg = 0, 
  secondDeg = 0,
  theme = 'light',
  onClockFaceClick
}) => {
  const hourMarks = Array.from({ length: 12 }, (_, i) => i);
  const radius = 86; // 减小半径，确保刻度在表盘内
  
  return (
    <div className={`relative w-48 h-48 rounded-full flex items-center justify-center
      ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} 
      border-4 shadow-lg overflow-hidden`}
      onClick={onClockFaceClick}
    > {/* 添加 overflow-hidden 防止溢出 */}
      
      {/* 时钟刻度 */}
      {hourMarks.map((hour) => {
        const angle = hour * 30 * (Math.PI / 180);
        const x = Math.sin(angle) * radius;
        const y = -Math.cos(angle) * radius;
        
        return (
          <div 
            key={hour}
            className={`absolute h-2.5 w-[2px] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
            style={{
              transform: `translate(${x}px, ${y}px) rotate(${hour * 30}deg)`,
              top: '50%',
              left: '50%',
              marginTop: '-5px', // 补偿刻度高度的一半
              marginLeft: '-1px', // 补偿刻度宽度的一半
            }}
          />
        );
      })}
      
      {/* 时针 */}
      <ClockHand 
        angle={hourDeg} 
        length={30} 
        width={4} 
        color={theme === 'dark' ? 'bg-white' : 'bg-black'} 
      />
      
      {/* 分针 */}
      <ClockHand 
        angle={minuteDeg} 
        length={40} 
        width={3} 
        color={theme === 'dark' ? 'bg-white' : 'bg-black'} 
      />
      
      {/* 秒针 */}
      <ClockHand 
        angle={secondDeg} 
        length={45} 
        width={1.5} 
        color="bg-red-500" 
        tailLength={10}
      />
      
      {/* 中心点 */}
      <Center theme={theme} />

    </div>
  );
};

export default ClockFace;