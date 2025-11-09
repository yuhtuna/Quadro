import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
// import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Could not find root element to mount to');

const root = ReactDOM.createRoot(rootEl);

const Root = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('isAuthenticated'));

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', '1');
    setIsAuth(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={isAuth ? <MainPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </React.StrictMode>
);