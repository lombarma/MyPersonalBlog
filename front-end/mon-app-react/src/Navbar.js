import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    let navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <nav>
            <div className="Links">
                {/* Utilisez des boutons pour la navigation */}
                <button onClick={() => handleNavigation('/')}>Accueil</button>
                <button onClick={() => handleNavigation('/about')}>À Propos</button>
                <button onClick={() => handleNavigation('/search')}>Rechercher un article</button>
                <button onClick={() => handleNavigation('/login')}>Se connecter</button>
                {/* etc. */}
            </div>
        </nav>
    );
}

export default Navbar;
