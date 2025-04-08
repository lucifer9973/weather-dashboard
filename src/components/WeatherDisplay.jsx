import React from 'react'

const WeatherDisplay = ({ data }) => {
  if (!data) return null

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-gray-600 capitalize">{data.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="Weather icon"
          className="w-16 h-16"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Temperature</p>
          <p className="text-xl font-bold">{Math.round(data.main.temp)}°C</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="text-xl font-bold">{data.main.humidity}%</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Wind Speed</p>
          <p className="text-xl font-bold">{data.wind.speed} km/h</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Feels Like</p>
          <p className="text-xl font-bold">{Math.round(data.main.feels_like)}°C</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherDisplay