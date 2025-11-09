import React from 'react';
import { HistoryItem } from '../types';
import { DownloadCloudIcon, VideoCameraIcon, EditIcon, TrashIcon } from './Icons';

interface HistorySidebarProps {
  isOpen: boolean;
  history: HistoryItem[];
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, history }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white transform transition-transform duration-300 ease-in-out z-20
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-56 sm:w-64 md:w-72 lg:w-80
      `}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <DownloadCloudIcon className="w-6 h-6" />
          Downloads
        </h2>
      </div>
      <nav className="mt-4 flex-1 px-2 space-y-1 overflow-y-auto h-[calc(100%-4.5rem)]">
        {history.length > 0 ? (
          history.map((item) => (
            <div
              key={item.id}
              className="group flex items-center px-3 py-3 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
            >
              <img src={item.thumbnailUrl} alt={item.name} className="h-10 w-10 rounded-md mr-3 object-cover"/>
              <div className="flex-1">
                <p className="truncate">{item.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
              </div>
              <div className="flex items-center ml-2">
                <button className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-yellow-900 dark:hover:text-yellow hover:bg-yellow-200 dark:hover:bg-yellow-600">
                    <EditIcon className="w-4 h-4" />
                </button>
                <button className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-red-900 dark:hover:text-red hover:bg-red-200 dark:hover:bg-red-600">
                    <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 p-4 flex flex-col items-center">
            <VideoCameraIcon className="w-12 h-12 mb-2 text-gray-400 dark:text-gray-500"/>
            <p>No downloads yet.</p>
            <p className="text-xs">Submit a video to process it.</p>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default HistorySidebar;
