import React, { useState, useEffect } from 'react';
import Clock from './components/Clock';
import GlobalTimeFormatToggle from './components/GlobalTimeFormatToggle';
import './index.css';

function App() {
  const [globalTheme, setGlobalTheme] = useState(
    localStorage.getItem('globalTheme') || 'light'
  );

  // 添加系统主题变化监听
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 处理主题变化
    const handleThemeChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setGlobalTheme(newTheme);
      localStorage.setItem('globalTheme', newTheme);
    };

    // 添加监听器
    mediaQuery.addEventListener('change', handleThemeChange);
    
    // 初始化时检查系统主题
    handleThemeChange(mediaQuery);

    // 清理监听器
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  const clocks = [
    { id: 1, city: 'Beijing', timezone: 8 },
    { id: 2, city: 'New York', timezone: -4 },
    { id: 3, city: 'Sydney', timezone: 11 },
    { id: 4, city: 'London', timezone: 1 },
  ];

  const handleGlobalTimeFormatChange = (newFormat) => {
    window.location.reload();
  };

  const toggleGlobalTheme = () => {
    const newTheme = globalTheme === 'light' ? 'dark' : 'light';
    setGlobalTheme(newTheme);
    localStorage.setItem('globalTheme', newTheme);
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-1000 flex flex-col justify-center
      ${globalTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-6">
          <h1 className={`text-3xl font-bold text-center
            ${globalTheme === 'dark' ? 'text-white' : 'text-black'}`}>
            World Clock
          </h1>
          <button
            onClick={toggleGlobalTheme}
            className={`absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 
              px-4 py-2 rounded-full transition-colors duration-300
              ${globalTheme === 'dark' 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-200 text-black hover:bg-gray-300'}`}
          >
            {globalTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        
        <div className="flex justify-center mb-2">
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
