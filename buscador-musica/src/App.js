import React, { useState } from 'react';
import SearchBar from './componentes/SearchBar';
import SongTable from './componentes/SongTable';
import { searchTracks, markAsFavorite } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [songs, setSongs] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Elementos por página
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [noResults, setNoResults] = useState(false); // Controla si no hay resultados
    const [successfulSearches, setSuccessfulSearches] = useState([]); // Almacena nombres de bandas con resultados

    const handleSearch = async (bandName) => {
        try {
            const data = await searchTracks(bandName);
            setSongs(data.canciones);
            setCurrentPage(1); // Resetear a la primera página al buscar

            if (data.canciones.length === 0) {
                setNoResults(true);
            } else {
                setNoResults(false);
                // Agregar el nombre de la banda a successfulSearches si no está ya en la lista
                setSuccessfulSearches(prevSearches => (
                    prevSearches.includes(bandName) ? prevSearches : [...prevSearches, bandName]
                ));
            }
        } catch (error) {
            console.error("Error al obtener canciones:", error);
            setNoResults(true);
        }
    };

    const handleFavorite = async (song) => {
        try {
            await markAsFavorite(song);
            setFavoriteIds((prev) => {
                const isAlreadyFavorite = prev.includes(song.cancion_id);
                return isAlreadyFavorite
                    ? prev.filter((id) => id !== song.cancion_id)
                    : [...prev, song.cancion_id];
            });
        } catch (error) {
            console.error("Error al marcar/desmarcar como favorita:", error);
        }
    };

    const indexOfLastSong = currentPage * itemsPerPage;
    const indexOfFirstSong = indexOfLastSong - itemsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Resetear a la primera página
    };

    const totalPages = Math.ceil(songs.length / itemsPerPage); // Total de páginas

    return (
        <div className="container">
            <h1>Buscador de Canciones</h1>
            <SearchBar onSearch={handleSearch} />

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

            {noResults ? (
                <p className="text-danger">Banda no existente</p>
            ) : currentSongs.length > 0 ? (
                <SongTable 
                    songs={currentSongs}
                    favoriteIds={favoriteIds}
                    onFavorite={handleFavorite}
                />
            ) : null}

            {/* Mostrar nombres de bandas con resultados exitosos y hacerlos seleccionables */}
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
