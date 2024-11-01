import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const searchTracks = async (bandName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search_tracks?name=${bandName}`);
        return response.data;
    } catch (error) {
        console.error("Error al buscar canciones:", error);
        throw error;
    }
};

export const markAsFavorite = async (song) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/favoritos`, {
            nombre_banda: song.nombre_album,
            cancion_id: song.cancion_id,
            usuario: "juan", // Puedes hacer esto dinámico si quieres
            ranking: "5/5"
        });
        return response.data;
    } catch (error) {
        console.error("Error al marcar como favorito:", error);
        throw error;
    }
};
