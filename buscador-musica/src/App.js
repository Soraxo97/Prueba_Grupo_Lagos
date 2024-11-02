import React, { useState } from 'react';
import SearchBar from './componentes/SearchBar';  // Componente de búsqueda
import SongTable from './componentes/SongTable';  // Componente que muestra la lista de canciones
import { searchTracks, markAsFavorite } from './services/api';  // Funciones API para buscar y marcar como favorito
import 'bootstrap/dist/css/bootstrap.min.css';  // Importación de estilos de Bootstrap
import './App.css';  // Importación de estilos personalizados

function App() {
    const [songs, setSongs] = useState([]); // Estado para almacenar las canciones obtenidas en la búsqueda
    const [favoriteIds, setFavoriteIds] = useState([]); // Estado para almacenar los IDs de las canciones marcadas como favoritas
    const [itemsPerPage, setItemsPerPage] = useState(5); // Estado para definir el número de elementos por página (por defecto, 5)
    const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual de la paginación
    const [noResults, setNoResults] = useState(false); // Estado para controlar si no hay resultados en la búsqueda
    const [successfulSearches, setSuccessfulSearches] = useState([]); // Estado para almacenar los nombres de bandas que devolvieron resultados exitosos
    const [currentBand, setCurrentBand] = useState(''); // Nuevo estado para almacenar el nombre de la banda actual

    /**
     * Maneja la búsqueda de canciones según el nombre de la banda.
     * @param {string} bandName - El nombre de la banda a buscar.
     */
    const handleSearch = async (bandName) => {
        try {
            const data = await searchTracks(bandName); // Llama a la función API para buscar canciones
            console.log(data); // Muestra los datos en la consola
            setSongs(data.canciones);  // Actualiza el estado con las canciones obtenidas
            setCurrentPage(1);  // Reinicia la paginación a la primera página

            // Verifica si no hubo resultados
            if (data.canciones.length === 0) {
                setNoResults(true);
            } else {
                setNoResults(false);
                // Agrega el nombre de la banda a la lista de búsquedas exitosas si aún no está
                setSuccessfulSearches(prevSearches => (
                    prevSearches.includes(bandName) ? prevSearches : [...prevSearches, bandName]
                ));
                // Guarda el nombre de la banda actual
                setCurrentBand(bandName);
            }
        } catch (error) {
            console.error("Error al obtener canciones:", error);
            setNoResults(true);
        }
    };

    /**
     * Maneja la acción de marcar o desmarcar una canción como favorita.
     * @param {object} song - La canción a marcar o desmarcar como favorita.
     */
    const handleFavorite = async (song) => {
        try {
            const response = await markAsFavorite(song, currentBand); // Llama a la función API y pasa el nombre de la banda
            console.log("Respuesta de la API:", response); // Imprime la respuesta de la API en la consola
    
            setFavoriteIds((prev) => {
                const isAlreadyFavorite = prev.includes(song.cancion_id);
                // console.log(`Canción ${isAlreadyFavorite ? 'desmarcada' : 'marcada'} como favorita:`, response);
                return isAlreadyFavorite
                    ? prev.filter((id) => id !== song.cancion_id) // La elimina si ya es favorita
                    : [...prev, song.cancion_id]; // La añade si no es favorita
            });
        } catch (error) {
            console.error("Error al marcar/desmarcar como favorita:", error);
        }
    };

    // Cálculo de índices de inicio y fin para los elementos en la página actual
    const indexOfLastSong = currentPage * itemsPerPage;
    const indexOfFirstSong = indexOfLastSong - itemsPerPage;
    // Canciones que se mostrarán en la página actual
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

    /**
     * Cambia la página actual al número indicado.
     * @param {number} pageNumber - El número de la página a la cual navegar.
     */
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    /**
     * Cambia el número de elementos a mostrar por página.
     * @param {number} value - El número de elementos a mostrar.
     */
    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1);  // Reinicia la paginación a la primera página
    };

    // Cálculo del número total de páginas
    const totalPages = Math.ceil(songs.length / itemsPerPage);

    return (
        <div className="container">
            <h1>Buscador de Canciones</h1>
            <SearchBar onSearch={handleSearch} />

            {/* Opciones para seleccionar el número de items por página */}
            <div className="mb-3">
                <label className="form-label">Items por página:</label>
                <div>
                    {[5, 10, 15, 20].map((value) => (
                        <button
                            key={value}
                            onClick={() => handleItemsPerPageChange(value)}
                            className={`btn btn-outline-primary ${itemsPerPage === value ? 'active' : ''}`}
                            style={{ marginRight: '5px' }}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mensaje si no se encuentran resultados */}
            {noResults ? (
                <p className="text-danger">Banda no existente</p>
            ) : currentSongs.length > 0 ? (
                <SongTable 
                    songs={currentSongs}
                    favoriteIds={favoriteIds}
                    onFavorite={handleFavorite}
                />
            ) : null}

            {/* Listado de bandas que han tenido búsquedas exitosas */}
            <div className="mt-3">
                <h5>Bandas con resultados:</h5>
                <div className="d-flex flex-wrap">
                    {successfulSearches.map((name, index) => (
                        <button
                            key={index}
                            onClick={() => handleSearch(name)}
                            className="btn btn-outline-secondary me-2 mb-2"
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Paginación */}
            <nav>
                <ul className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default App;
