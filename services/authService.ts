import api from './api';

const API_URL = `/user`;

const register = (username, password) => {
    return api.post(`${API_URL}/register`, {
        username,
        password,
    });
};

const login = async (username, password) => {
    const response = await api.post(`${API_URL}/login`, {
        username,
        password,
    });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    return api.get(`${API_URL}/me`);
};

const getToken = () => {
    return localStorage.getItem('token');
};

const authService = {
    register,
    login,
    logout,
    getToken,
    getCurrentUser,
};

export default authService;
