import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [bandName, setBandName] = useState('');

    const handleSearch = () => {
        onSearch(bandName);
    };

    return (
        <div className="d-flex justify-content-center mb-3">
            <input
                type="text"
                placeholder="Ingresa el nombre de la banda"
                value={bandName}
                onChange={(e) => setBandName(e.target.value)}
                className="form-control me-2" // Clases de Bootstrap para el input
            />
            <button onClick={handleSearch} className="btn btn-warning">Buscar</button> {/* Color de botón amarillo */}
        </div>
    );
};

export default SearchBar;
