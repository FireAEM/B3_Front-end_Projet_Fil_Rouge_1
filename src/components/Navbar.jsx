import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ onSearch }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <header className="fixed-top">
            <nav
                className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-75 shadow-sm py-2 px-3"
                aria-label="Navigation principale du site"
            >
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    {/* Logo */}
                    <Link className="navbar-brand p-0 me-3" to="/">
                        <img
                            src="/images/logo.jpeg"
                            alt="Streamflix • Films en streaming"
                            className="logo-stream rounded-circle"
                        />
                    </Link>

                    {/* Bouton hamburger */}
                    <button
                        className="navbar-toggler rounded-pill"
                        type="button"
                        aria-controls="navbarStreamflix"
                        aria-expanded={isOpen}
                        aria-label="Menu"
                        onClick={handleToggle}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Contenu du menu */}
                    <div
                        className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
                        id="navbarStreamflix"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? 'nav-link active' : 'nav-link'
                                    }
                                >
                                    Accueil
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/films" className="nav-link">
                                    Films
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/series" className="nav-link">
                                    Séries
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/liste" className="nav-link">
                                    Ma liste
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/quiz" className="nav-link">
                                    Quiz Cinéma
                                </NavLink>
                            </li>
                        </ul>

                        {/* Formulaire de recherche */}
                        <form
                            className="navbar-search d-flex align-items-center justify-content-between me-lg-3 mb-2 mb-lg-0"
                            role="search"
                            onSubmit={handleSubmit}
                        >
                            <label htmlFor="navbar-search-input" className="visually-hidden">
                                Rechercher un film ou une série
                            </label>
                            <input
                                id="navbar-search-input"
                                className="form-control p-1"
                                type="search"
                                placeholder="Recherche..."
                                aria-label="Recherche"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button className="btn p-1" type="submit" aria-label="Lancer la recherche">
                                🔍
                            </button>
                        </form>

                        {/* Lien Compte */}
                        <Link to="/compte" className="btn btn-stream btn-sm">
                            🧔 Compte
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;