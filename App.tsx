import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import HistorySidebar from './components/HistorySidebar';
import VideoProcessor from './components/VideoProcessor';
import { HistoryItem } from './types';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: '1', name: 'Fishy.mp4', date: '2023-10-26', thumbnailUrl: 'https://png.pngtree.com/png-clipart/20250604/original/pngtree-animated-vegetable-carrot-with-funny-face-png-image_21124129.png' },
    { id: '2', name: 'TUAN.mov', date: '2023-10-25', thumbnailUrl: 'https://picsum.photos/id/1018/100/100' },
    { id: '3', name: 'HOSHUA.avi', date: '2023-10-24', thumbnailUrl: 'https://picsum.photos/id/1025/100/100' },
  ]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const addHistoryItem = useCallback((name: string) => {
    const newItem: HistoryItem = {
      id: new Date().toISOString(),
      name,
      date: new Date().toLocaleDateString('en-CA'),
      thumbnailUrl: `https://picsum.photos/seed/${Math.random()}/100/100`,
    };
    setHistory(prev => [newItem, ...prev]);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <HistorySidebar isOpen={isSidebarOpen} history={history} />
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out" style={{ marginLeft: isSidebarOpen ? '16rem' : '0' }}>
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <VideoProcessor onNewHistoryItem={addHistoryItem} />
        </main>
      </div>
    </div>
  );
};

export default App;
