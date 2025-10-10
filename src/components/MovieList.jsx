import React, { useState } from "react";
import MovieCard from "./MovieCard";

function slugify(text) {
    return text
        .toLowerCase()
        .normalize("NFD") // supprime les accents
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-") // espaces → tirets
        .replace(/[^a-z0-9-]/g, ""); // supprime caractères spéciaux
}

function MovieList({ movies, title }) {
    const [visible, setVisible] = useState(true);

    if (movies.length === 0) {
        return (
            <div className="alert alert-warning rounded-pill">
                <p className="mb-0">Aucun film trouvé. 😢</p>
            </div>
        );
    }

    // Générer un identifiant basé sur le titre
    const slug = title ? slugify(title) : "movies";

    return (
        <section
            className={`${slug} py-5 w-100`}
            aria-labelledby={`${slug}-title`}
        >
            <div className="container">
                {title && (
                    <h2 id={`${slug}-title`} className="mb-4">
                        {title}
                    </h2>
                )}

                {/* Bouton afficher/masquer */}
                <button
                    className="btn btn-secondary mb-3"
                    onClick={() => setVisible(!visible)}
                >
                    {visible ? "Masquer" : "Afficher"}
                </button>

                {/* Grille de films */}
                {visible && (
                    <div className="row g-4">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                year={movie.year}
                                poster={movie.poster}
                                categories={movie.categories}
                                rating={movie.rating}
                                duration={movie.duration}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default MovieList;
