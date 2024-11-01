import React from 'react';

const SongRow = ({ song, isFavorite, onFavorite }) => {
    const handleFavoriteClick = () => {
        onFavorite(song);
    };

    return (
        <tr>
            <td>{song.nombre_tema}</td>
            <td>{song.nombre_album}</td>
            <td>
                <a href={song.preview_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm">Vista Previa</a>
            </td>
            <td>{`${song.precio.valor} ${song.precio.moneda}`}</td>
            <td>{song.fecha_lanzamiento}</td>
            <td>
                <button 
                    onClick={handleFavoriteClick} 
                    className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-light'}`} // Cambia el color del botón
                >
                    {isFavorite ? 'Favorito' : 'Marcar Favorito'}
                </button>
            </td>
        </tr>
    );
};

export default SongRow;
