import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './components/pages/LoginPage';
// import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Could not find root element to mount to');

const root = ReactDOM.createRoot(rootEl);
const isAuth = !!localStorage.getItem('isAuthenticated');

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={isAuth ? <App /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);