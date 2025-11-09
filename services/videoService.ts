import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/video`;

const authHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
};

const processVideo = (video) => {
    const formData = new FormData();
    formData.append('video', video);

    return axios.post(`${API_URL}/process`, formData, {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data',
        },
    });
};

const videoService = {
    processVideo,
};

export default videoService;
