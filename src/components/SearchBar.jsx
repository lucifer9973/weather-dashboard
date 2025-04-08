import React from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ onSearch, darkMode }) => {
  const [city, setCity] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="flex gap-2 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className={`w-full p-3 rounded-xl shadow-sm transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-400' 
            : 'bg-white text-gray-900 focus:ring-blue-400'
        } border-0 focus:outline-none focus:ring-2 pr-12`}
      />
      
      <motion.button
        type="submit"
        className={`absolute right-2 top-2 p-2 rounded-lg ${
          darkMode 
            ? 'text-gray-300 hover:bg-gray-600' 
            : 'text-gray-600 hover:bg-gray-100'
        } transition-colors`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MagnifyingGlassIcon className="w-6 h-6" />
      </motion.button>
    </motion.form>
  );
};

export default SearchBar;