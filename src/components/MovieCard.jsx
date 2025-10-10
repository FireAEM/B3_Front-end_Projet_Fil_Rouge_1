import React, { useState } from "react";

function MovieCard({ id, title, year, poster, categories, rating, duration }) {
    const [watched, setWatched] = useState(false);

    const stars =
        "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));

    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div
                className={`card movie-card h-100 text-light ${watched ? "watched" : ""
                    }`}
                onClick={() => setWatched(!watched)}
                style={{ cursor: "pointer" }}
            >
                <div className="movie-image">
                    <img
                        src={poster}
                        className="card-img-top img-fluid"
                        alt={`Affiche du film ${title} (${year})`}
                    />
                </div>
                <div className="card-body d-flex flex-column align-items-center gap-1">
                    <h3 className="card-title text-center">
                        {title} ({year})
                    </h3>
                    <p className="card-text small mb-1 badge text-bg-secondary">
                        <span className="visually-hidden">Catégories : </span>
                        {categories}
                    </p>
                    <div className="mb-1">
                        <span aria-hidden="true">{stars}</span>
                        <span className="visually-hidden">
                            Note : {rating} étoiles sur 5
                        </span>
                    </div>
                    <p className="card-text small mb-3">
                        <span aria-hidden="true">{duration}</span>
                        <span className="visually-hidden">Durée : {duration}</span>
                    </p>
                    <a
                        href={`/movie/${id}`}
                        className="btn btn-stream mt-auto w-100"
                        aria-label={`Regarder ${title} (${year})`}
                        onClick={(e) => e.stopPropagation()} // éviter de toggler "watched" quand on clique sur le bouton
                    >
                        Regarder
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;