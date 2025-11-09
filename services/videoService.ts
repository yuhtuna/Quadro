import api from './api';

const API_URL = `/video`;

const processVideo = (video) => {
    const formData = new FormData();
    formData.append('video', video);

    return api.post(`${API_URL}/process`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const getHistory = () => {
    return api.get(`${API_URL}`);
};

const deleteVideo = (id) => {
    return api.delete(`${API_URL}/${id}`);
};

const updateVideoName = (id, name) => {
    return api.put(`${API_URL}/${id}`, { name });
};

const videoService = {
    processVideo,
    getHistory,
    deleteVideo,
    updateVideoName,
};

export default videoService;
