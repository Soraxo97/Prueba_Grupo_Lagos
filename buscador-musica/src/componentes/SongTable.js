import React from 'react';
import SongRow from './SongRow';

/**
 * Componente SongTable que muestra una tabla con información sobre canciones.
 * 
 * @param {Object} props - Las propiedades que recibe el componente.
 * @param {Array} props.songs - Lista de canciones a mostrar en la tabla.
 * @param {Array} props.favoriteIds - Lista de IDs de canciones marcadas como favoritas.
 * @param {Function} props.onFavorite - Función de callback que se ejecuta al marcar o desmarcar una canción como favorita.
 */
const SongTable = ({ songs, favoriteIds, onFavorite }) => {
    return (
        <table className="table table-dark table-striped"> {/* Estilos de Bootstrap para la tabla */}
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
                        key={song.cancion_id} // Uso del ID de la canción como clave única
                        song={song} // Información de la canción
                        isFavorite={favoriteIds.includes(song.cancion_id)} // Verifica si la canción es favorita
                        onFavorite={onFavorite} // Función para manejar la acción de favorito
                    />
                ))}
            </tbody>
        </table>
    );
};

export default SongTable;
