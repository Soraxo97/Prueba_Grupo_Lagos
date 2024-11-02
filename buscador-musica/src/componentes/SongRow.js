import React from 'react';

/**
 * Componente para representar una fila de la tabla de canciones.
 * 
 * @param {Object} props - Las propiedades que recibe el componente.
 * @param {Object} props.song - La canción a mostrar en esta fila.
 * @param {boolean} props.isFavorite - Indica si la canción está marcada como favorita.
 * @param {Function} props.onFavorite - Función para manejar el evento de marcar/desmarcar como favorita.
 */
const SongRow = ({ song, isFavorite, onFavorite }) => {
    /**
     * Llama a la función onFavorite con la canción actual cuando se hace clic en el botón de favorito.
     */
    const handleFavoriteClick = () => {
        onFavorite(song);
    };

    return (
        <tr>
            {/* Muestra el nombre del tema */}
            <td>{song.nombre_tema}</td>

            {/* Muestra el nombre del álbum */}
            <td>{song.nombre_album}</td>

            {/* Enlace para vista previa de la canción */}
            <td>
                <a href={song.preview_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm">
                    Vista Previa
                </a>
            </td>

            {/* Muestra el precio de la canción en el formato "valor moneda" */}
            <td>{`${song.precio.valor} ${song.precio.moneda}`}</td>

            {/* Muestra la fecha de lanzamiento de la canción */}
            <td>{song.fecha_lanzamiento}</td>

            {/* Botón para marcar o desmarcar la canción como favorita */}
            <td>
                <button 
                    onClick={handleFavoriteClick} 
                    className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-light'}`} // Cambia el color del botón si es favorita
                >
                    {isFavorite ? 'Favorito' : 'Marcar Favorito'}
                </button>
            </td>
        </tr>
    );
};

export default SongRow;
