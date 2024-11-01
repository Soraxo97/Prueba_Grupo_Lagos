import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // URL del backend

export const searchTracks = async (bandName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search_tracks?name=${bandName}`);
        return response.data;
    } catch (error) {
        console.error("Error al buscar canciones:", error);
        throw error;
    }
};