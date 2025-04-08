import { motion } from 'framer-motion';

const Forecast = ({ data, darkMode }) => {
  const dailyForecast = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className={`weather-card ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(dailyForecast).slice(0, 5).map(([date, items], index) => (
          <motion.div
            key={date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`forecast-item ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          >
            <p className="font-medium mb-2">
              {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${items[0].weather[0].icon}@2x.png`}
              alt="Weather icon"
              className="w-12 h-12 mx-auto"
            />
            <p className="text-center mt-2">
              {Math.round(items.reduce((sum, item) => sum + item.main.temp_max, 0) / items.length)}°C
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;