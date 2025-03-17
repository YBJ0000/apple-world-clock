import React, { useState, useEffect } from 'react';
import ClockFace from './ClockFace';
import TimeFormatToggle from './TimeFormatToggle';

const Clock = ({ city, timezone, customName }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // 初始化时就计算正确的主题
  const getInitialTheme = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (3600000 * timezone));
    const hours = cityTime.getHours();
    return (hours >= 19 || hours < 6) ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme());
  
  // 在组件挂载后添加延迟以显示过渡效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(
    localStorage.getItem(`timeFormat-${city}`) !== 'false'
  );
  const [displayName, setDisplayName] = useState(
    customName || localStorage.getItem(`city-${city}`) || city
  );
  
  // 更新时间
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // 计算时区时间
  const getTimezoneTime = () => {
    const date = new Date(time);
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * timezone));
  };
  
  const timezoneTime = getTimezoneTime();
  
  // 根据时区时间自动设置主题
  useEffect(() => {
    const hours = timezoneTime.getHours();
    const isDarkTime = hours >= 19 || hours < 6; // 晚上7点到早上6点使用深色主题
    setTheme(isDarkTime ? 'dark' : 'light');
  }, [timezoneTime]);

  // 格式化时间
  const formattedTime = is24Hour 
    ? timezoneTime.toLocaleTimeString([], { hour12: false })
    : timezoneTime.toLocaleTimeString([], { hour12: true });
  
  // 计算指针角度
  const hours = timezoneTime.getHours() % 12;
  const minutes = timezoneTime.getMinutes();
  const seconds = timezoneTime.getSeconds();
  
  const hourDegrees = (hours * 30) + (minutes * 0.5);
  const minuteDegrees = minutes * 6;
  const secondDegrees = seconds * 6;
  
  // 保存自定义名称
  const saveCustomName = (name) => {
    setDisplayName(name);
    localStorage.setItem(`city-${city}`, name);
  };
  
  // 处理时间格式变化
  const handleTimeFormatChange = (newFormat) => {
    setIs24Hour(newFormat);
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-3xl m-4
      ${isLoading ? (theme === 'dark' ? 'bg-white text-black' : 'bg-gray-900 text-white') : 
        (theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black')
      } 
      shadow-lg transition-all duration-1000`}>
      
      {/* 城市名称 - 可编辑 */}
      <div className="mb-4 text-center">
        <input
          type="text"
          value={displayName}
          onChange={(e) => saveCustomName(e.target.value)}
          className={`text-center text-xl font-semibold bg-transparent border-b 
            ${theme === 'dark' ? 'border-gray-700 text-white' : 'border-gray-300 text-black'} 
            focus:outline-none`}
        />
      </div>
      
      {/* 时钟面 */}
      <ClockFace 
        hourDeg={hourDegrees}
        minuteDeg={minuteDegrees}
        secondDeg={secondDegrees}
        theme={theme}
      />
      
      {/* 数字时间显示 */}
      <div className="mt-4 text-center">
        <p className="text-lg">{formattedTime}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {timezoneTime.toLocaleDateString()}
        </p>
      </div>
      
      {/* 使用新的时间格式切换组件 */}
      <TimeFormatToggle 
        cityId={city} 
        onChange={handleTimeFormatChange}
        theme={theme}
      />
    </div>
  );
};

export default Clock;