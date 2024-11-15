import { Link, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-transparent dark:bg-transparent shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-semibold">
            ModernHuman
          </Link>
          <div className="flex items-center space-x-4 sm:hidden ml-4">
            <button
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {location.pathname !== '/' && (
          <nav className="flex items-center space-x-6">
            <Link
              to="/courses"
              className={`transition-colors ${
                isActive('/courses')
                  ? 'text-blue-500'
                  : 'text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              Courses
            </Link>
            <Link
              to="/community"
              className={`transition-colors ${
                isActive('/community')
                  ? 'text-blue-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              Community
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}