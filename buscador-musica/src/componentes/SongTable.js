import React from 'react';
import SongRow from './SongRow';

const SongTable = ({ songs, favoriteIds, onFavorite }) => {
    return (
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Nombre Canción</th>
                    <th>Álbum</th>
                    <th>Vista Previa</th>
                    <th>Precio</th>
                    <th>Fecha de Lanzamiento</th>
                    <th>Favorito</th>
                </tr>
            </thead>
            <tbody>
                {songs.map((song) => (
                    <SongRow 
                        key={song.cancion_id} 
                        song={song} 
                        isFavorite={favoriteIds.includes(song.cancion_id)} 
                        onFavorite={onFavorite} 
                    />
                ))}
            </tbody>
        </table>
    );
};

export default SongTable;
