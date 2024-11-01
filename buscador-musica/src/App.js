import React, { useState } from 'react';
import SearchBar from './componentes/SearchBar';
import SongTable from './componentes/SongTable';
import { searchTracks, markAsFavorite } from './services/api';
import './App.css'; // Importa el archivo CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [songs, setSongs] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);

    const handleSearch = async (bandName) => {
        try {
            const data = await searchTracks(bandName);
            setSongs(data.canciones);
        } catch (error) {
            console.error("Error al obtener canciones:", error);
        }
    };

    const handleFavorite = async (song) => {
        try {
            await markAsFavorite(song);  // Llama al backend para marcar o desmarcar la canción
            setFavoriteIds(prev => {
                const isAlreadyFavorite = prev.includes(song.cancion_id);
                if (isAlreadyFavorite) {
                    // Si ya es favorita, la quitamos
                    return prev.filter(id => id !== song.cancion_id);
                } else {
                    // Si no es favorita, la agregamos
                    return [...prev, song.cancion_id];
                }
            });
        } catch (error) {
            console.error("Error al marcar/desmarcar como favorita:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Buscador de Canciones</h1>
            <SearchBar onSearch={handleSearch} />
            {songs.length > 0 && (
                <SongTable 
                    songs={songs} 
                    favoriteIds={favoriteIds} 
                    onFavorite={handleFavorite} 
                />
            )}
        </div>
    );
}

export default App;
