import React, { useState, useEffect } from 'react';
import { HistoryItem } from '../types';
import { DownloadCloudIcon, EmptyBoxIcon, EditIcon, TrashIcon } from './Icons';
import videoService from '../services/videoService';

interface HistorySidebarProps {
  isOpen: boolean;
  onHistoryUpdate: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onHistoryUpdate }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await videoService.getHistory();
        setHistory(response.data.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await videoService.deleteVideo(id);
        setHistory(history.filter((item) => item.id !== id));
        onHistoryUpdate();
      } catch (error) {
        console.error('Error deleting video:', error);
        alert('Error deleting video. Please try again.');
      }
    }
  };

  const handleEdit = async (id: string) => {
    const newName = window.prompt('Enter new name for the video:');
    if (newName) {
      try {
        await videoService.updateVideoName(id, newName);
        setHistory(
          history.map((item) =>
            item.id === id ? { ...item, name: newName } : item
          )
        );
        onHistoryUpdate();
      } catch (error) {
        console.error('Error updating video name:', error);
        alert('Error updating video name. Please try again.');
      }
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white w-64 transform transition-transform duration-300 ease-in-out z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
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
              <img src={item.thumbnailUrl} alt={item.name} className="h-10 w-10 rounded-md mr-3 object-cover" />
              <div className="flex-1">
                <p className="truncate">{item.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
              </div>
              <div className="flex items-center ml-2">
                <button onClick={() => handleEdit(item.id)} className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400">
                  <EditIcon className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">                    <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 p-4 flex flex-col items-center">
            <EmptyBoxIcon className="w-12 h-12 mb-2 text-gray-400 dark:text-gray-500" />
            <p>Your history files will go here.</p>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default HistorySidebar;
