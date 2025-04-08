import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import Spinner from './components/Spinner';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedHistory = localStorage.getItem('searchHistory');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setDarkMode(savedTheme ? savedTheme === 'dark' : systemDark);
    document.documentElement.classList.toggle('dark', savedTheme ? savedTheme === 'dark' : systemDark);
    
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
  }, []);

  const fetchData = async (city) => {
    if (!city || loading) return;
    
    try {
      setLoading(true);
      setError('');
      
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      ]);

      setWeather(currentRes.data);
      setForecast(forecastRes.data);
      updateSearchHistory(city);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchHistory = (city) => {
    const newHistory = [
      city,
      ...searchHistory.filter(item => item.toLowerCase() !== city.toLowerCase())
    ].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark:bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        <SearchBar onSearch={fetchData} darkMode={darkMode} loading={loading} />
        
        <motion.div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <AnimatePresence initial={false}>
            {searchHistory.map((city) => (
              <motion.button
                key={city}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => fetchData(city)}
                className={`px-4 py-2 rounded-full text-sm ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
                    : 'bg-white hover:bg-gray-100 text-gray-900'
                } shadow-sm transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {city}
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {loading && <Spinner />}
        
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 mb-4 text-red-500 bg-red-100 dark:bg-red-900/20 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {weather && forecast && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <WeatherDisplay data={weather} darkMode={darkMode} />
                <button
                  onClick={() => fetchData(weather.name)}
                  disabled={loading}
                  className="p-2 mt-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
                  aria-label="Refresh weather"
                >
                  <ArrowPathIcon className={`w-6 h-6 ${loading ? 'animate-spin' : ''} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>
              </div>
              <Forecast data={forecast} darkMode={darkMode} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
