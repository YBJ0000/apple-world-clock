export const handleClockFaceClick = (e, setShowWeather, setWeatherPosition, showWeather) => {
  e.stopPropagation(); // 阻止事件冒泡，导致事件冒泡到html外部
  const rect = e.currentTarget.getBoundingClientRect();
  setWeatherPosition({
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY
  });
  setShowWeather(!showWeather);
};