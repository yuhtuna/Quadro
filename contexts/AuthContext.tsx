import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = authService.getToken();
        if (storedToken) {
            setToken(storedToken);
            authService.getCurrentUser().then(response => {
                setUser(response.data);
            });
        }
    }, []);

    const login = async (username, password) => {
        const data = await authService.login(username, password);
        setToken(data.token);
        const userData = await authService.getCurrentUser();
        setUser(userData.data);
        return userData.data;
    };

    const logout = () => {
        authService.logout();
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
