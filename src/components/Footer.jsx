import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as bootstrap from "bootstrap";

function Footer({ totalFilms }) {
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        // Initialiser les tooltips Bootstrap
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].forEach(
            (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
        );
    }, []);

    return (
        <footer className="footer bg-footer-background text-light p-5 mt-5">
            <div className="container d-flex flex-column align-items-center gap-4">
                {/* Logo */}
                <Link to="/" className="footer-logo">
                    <img src="/images/logo.jpeg" alt="Streamflix • Films en streaming" />
                </Link>

                {/* Compteur de films */}
                <p className="badge mb-1 text-bg-secondary">
                    Catalogue : {totalFilms} films disponibles
                </p>

                {/* Réseaux sociaux */}
                <ul className="social-links list-unstyled d-flex flex-wrap justify-content-center gap-3 mb-0">
                    <li>
                        <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Suivez-nous sur Facebook"
                        >
                            <img src="/images/reseaux-sociaux/facebook.svg" alt="Facebook" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Suivez-nous sur Instagram"
                        >
                            <img src="/images/reseaux-sociaux/instagram.svg" alt="Instagram" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Suivez-nous sur TikTok"
                        >
                            <img src="/images/reseaux-sociaux/tiktok.svg" alt="TikTok" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Suivez-nous sur X"
                        >
                            <img src="/images/reseaux-sociaux/x.svg" alt="X" />
                        </a>
                    </li>
                </ul>

                {/* Liens légaux */}
                <div className="legal-links w-100 d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center gap-3">
                    <nav aria-label="Liens utiles">
                        <ul className="list-unstyled d-flex flex-column flex-lg-row align-items-center gap-2 mb-0">
                            <li><a href="#">Aide</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Mentions légales</a></li>
                            <li><a href="#">Conditions d'utilisation</a></li>
                        </ul>
                    </nav>
                    <p className="mb-0">&copy; {currentYear} Streamflix</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
