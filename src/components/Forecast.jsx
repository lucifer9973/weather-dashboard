import { motion } from 'framer-motion';

const Forecast = ({ data, darkMode }) => {
  const dailyForecast = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const dateString = date.toISOString().split('T')[0];
    if (!acc[dateString]) acc[dateString] = [];
    acc[dateString].push(item);
    return acc;
  }, {});

  return (
    <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(dailyForecast).slice(0, 5).map(([dateString, items], index) => {
          const date = new Date(dateString);
          return (
            <motion.div
              key={dateString}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg text-center transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
            >
              <p className="font-medium mb-2">
                {date.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  timeZone: 'UTC'
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${items[0].weather[0].icon}@2x.png`}
                alt="Weather icon"
                className="w-12 h-12 mx-auto"
              />
              <p className={`mt-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {Math.round(items.reduce((sum, item) => sum + item.main.temp_max, 0) / items.length}°C
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
