import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import MainApp from './MainApp';
import authService from './services/authService';

const AppContent = () => {
    const { token, login } = useAuth();
    const [showLogin, setShowLogin] = useState(true);

    if (!token) {
        if (showLogin) {
            return <Login onLoginSuccess={login} onSwitchToRegister={() => setShowLogin(false)} />;
        } else {
            return <Register onRegisterSuccess={() => setShowLogin(true)} onSwitchToLogin={() => setShowLogin(true)} />;
        }
    }

    return <MainApp />;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
