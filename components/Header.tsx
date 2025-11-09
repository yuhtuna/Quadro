import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { MenuIcon, XIcon, UserCircleIcon, LogoutIcon, SunIcon, MoonIcon } from './Icons';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="flex-shrink-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-lg sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-bold text-gray-700 dark:text-gray-200 tracking-wider" data-text="Quadro">Quadro</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-indigo-500"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
          </button>
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">{user ? user.username : 'User'}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-indigo-500"
            aria-label="Log out"
          >
            <LogoutIcon className="h-5 w-5" />
            <span className="hidden md:inline text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
