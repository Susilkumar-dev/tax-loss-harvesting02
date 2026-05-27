import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react'; 

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#0b1426] border-b border-gray-200 dark:border-gray-800 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold text-blue-600">Koin</span>
          <span className="text-2xl font-bold text-orange-500">X</span>
          <span className="text-[10px] align-top text-gray-400">®</span>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;