import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import HistorySidebar from './components/HistorySidebar';
import VideoProcessor from './components/VideoProcessor';
import { HistoryItem } from './types';
import { useAuth } from './contexts/AuthContext';
import videoService from './services/videoService';

const MainApp: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { logout } = useAuth();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [historyKey, setHistoryKey] = useState(0);

    const fetchHistory = useCallback(async () => {
        try {
            const response = await videoService.getHistory();
            setHistory(response.data.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    }, []);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const toggleSidebar = useCallback(() => {
      setIsSidebarOpen(prev => !prev);
    }, []);

    const handleHistoryUpdate = useCallback(() => {
        setHistoryKey(prevKey => prevKey + 1);
        fetchHistory();
    }, [fetchHistory]);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
            <HistorySidebar isOpen={isSidebarOpen} onHistoryUpdate={handleHistoryUpdate} key={historyKey} />
            <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out" style={{ marginLeft: isSidebarOpen ? '16rem' : '0' }}>
                <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} onLogout={logout} />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                    <VideoProcessor onNewHistoryItem={handleHistoryUpdate} />
                </main>
            </div>
        </div>
    );
};

export default MainApp;
