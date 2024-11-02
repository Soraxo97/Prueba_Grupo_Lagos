import React, { useState } from 'react';

/**
 * Componente SearchBar que permite al usuario ingresar el nombre de una banda y realizar una búsqueda.
 * 
 * @param {Object} props - Las propiedades que recibe el componente.
 * @param {Function} props.onSearch - Función de callback que se ejecuta cuando se realiza la búsqueda.
 */
const SearchBar = ({ onSearch }) => {
    // Estado para almacenar el nombre de la banda ingresado
    const [bandName, setBandName] = useState('');

    /**
     * Ejecuta la función de búsqueda pasando el nombre de la banda al componente padre.
     */
    const handleSearch = () => {
        onSearch(bandName);
    };

    return (
        <div className="d-flex justify-content-center mb-3">
            {/* Input para ingresar el nombre de la banda */}
            <input
                type="text"
                placeholder="Ingresa el nombre de la banda"
                value={bandName}
                onChange={(e) => setBandName(e.target.value)} // Actualiza el estado cuando cambia el valor del input
                className="form-control me-2" // Clases de Bootstrap para estilo y espaciado
            />
            
            {/* Botón para ejecutar la búsqueda */}
            <button onClick={handleSearch} className="btn btn-warning"> {/* Botón de búsqueda con estilo en amarillo */}
                Buscar
            </button>
        </div>
    );
};

export default SearchBar;
