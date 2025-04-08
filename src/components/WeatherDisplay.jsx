import React from 'react';

const WeatherDisplay = ({ data, darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md w-full`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {data.name}
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} capitalize mt-1`}>
            {data.weather[0].description}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="Weather icon"
          className="w-20 h-20"
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Temperature</p>
          <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {Math.round(data.main.temp)}°C
          </p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Humidity</p>
          <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {data.main.humidity}%
          </p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wind Speed</p>
          <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {data.wind.speed} km/h
          </p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Feels Like</p>
          <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {Math.round(data.main.feels_like)}°C
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
