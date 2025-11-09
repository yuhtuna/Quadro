import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/user`;

const register = (username, password) => {
    return axios.post(`${API_URL}/register`, {
        username,
        password,
    });
};

const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
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

const getToken = () => {
    return localStorage.getItem('token');
};

const authService = {
    register,
    login,
    logout,
    getToken,
};

export default authService;
