import axios from 'axios';

// URL base de la API
const API_BASE_URL = 'http://localhost:3001';

/**
 * Busca canciones de una banda especificada.
 * 
 * @param {string} bandName - El nombre de la banda que se desea buscar.
 * @returns {Promise<Object>} - Devuelve una promesa que se resuelve con los datos de las canciones.
 * @throws {Error} - Lanza un error si la búsqueda falla.
 */
export const searchTracks = async (bandName) => {
    try {
        // Realiza una solicitud GET a la API para buscar canciones
        const response = await axios.get(`${API_BASE_URL}/search_tracks?name=${bandName}`);
        return response.data; // Retorna los datos de la respuesta
    } catch (error) {
        console.error("Error al buscar canciones:", error);
        throw error; // Lanza el error para manejarlo en el componente que llama a esta función
    }
};

/**
 * Marca una canción como favorita.
 * 
 * @param {Object} song - Objeto que contiene información de la canción.
 * @param {string} song.nombre_album - Nombre del álbum de la canción.
 * @param {string} song.cancion_id - ID único de la canción.
 * @returns {Promise<Object>} - Devuelve una promesa que se resuelve con los datos de la respuesta de la API.
 * @throws {Error} - Lanza un error si la acción de marcar como favorito falla.
 */
export const markAsFavorite = async (song) => {
    try {
        // Realiza una solicitud POST a la API para marcar la canción como favorita
        const response = await axios.post(`${API_BASE_URL}/favoritos`, {
            nombre_banda: song.nombre_album, // Se asume que el nombre de la banda está en el nombre del álbum
            cancion_id: song.cancion_id, // ID de la canción
            usuario: "juan", // Usuario que marca la canción como favorita, se puede hacer dinámico
            ranking: "5/5" // Se puede ajustar el ranking según sea necesario
        });
        return response.data; // Retorna los datos de la respuesta
    } catch (error) {
        console.error("Error al marcar como favorito:", error);
        throw error; // Lanza el error para manejarlo en el componente que llama a esta función
    }
};
