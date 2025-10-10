import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";
import { getWeeklyMustWatch } from "../services/tmdbApi";

function Home({ search, onTotalFilms }) {
    const [weeklyMovies, setWeeklyMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Charger les 6 films populaires au démarrage
    useEffect(() => {
        async function loadWeeklyMovies() {
            try {
                setLoading(true);
                const movies = await getWeeklyMustWatch();
                setWeeklyMovies(movies);
                setError(null);
            } catch (err) {
                setError("Impossible de charger les films de la semaine");
            } finally {
                setLoading(false);
            }
        }
        loadWeeklyMovies();
    }, []);

    // Données statiques
    const tendances = [
        {
            id: 1,
            title: "The Dark Knight",
            year: 2008,
            poster: "/images/films/darknight.webp",
            categories: "Action, Crime, Drama",
            rating: 4.8,
            duration: "2h32",
        },
        {
            id: 2,
            title: "Interstellar",
            year: 2014,
            poster: "/images/films/Interstellar_film_poster.jpg",
            categories: "Sci-Fi, Drama",
            rating: 4.7,
            duration: "2h49",
        },
        {
            id: 3,
            title: "Pulp Fiction",
            year: 1994,
            poster: "/images/films/pulp_fiction.jpg",
            categories: "Crime, Drama",
            rating: 4.6,
            duration: "2h34",
        },
    ];

    const recommandes = [
        {
            id: 4,
            title: "Inception",
            year: 2010,
            poster: "/images/films/inception.webp",
            categories: "Sci-Fi, Thriller",
            rating: 4.5,
            duration: "2h28",
        },
        {
            id: 5,
            title: "The Matrix",
            year: 1999,
            poster: "/images/films/matrix.jpeg",
            categories: "Action, Sci-Fi",
            rating: 4.5,
            duration: "2h16",
        },
        {
            id: 6,
            title: "Forrest Gump",
            year: 1994,
            poster: "/images/films/forrest_gump.jpg",
            categories: "Drama, Romance",
            rating: 4.4,
            duration: "2h22",
        },
    ];

    const nouveautes = [
        {
            id: 7,
            title: "Interstellar",
            year: 2014,
            poster: "/images/films/Interstellar_film_poster.jpg",
            categories: "Sci-Fi, Drama",
            rating: 4.7,
            duration: "2h49",
        },
        {
            id: 8,
            title: "The Dark Knight",
            year: 2008,
            poster: "/images/films/darknight.webp",
            categories: "Action, Crime, Drama",
            rating: 4.8,
            duration: "2h32",
        },
        {
            id: 9,
            title: "Inception",
            year: 2010,
            poster: "/images/films/inception.webp",
            categories: "Sci-Fi, Thriller",
            rating: 4.5,
            duration: "2h28",
        },
    ];

    // Fonction de filtrage
    const filterMovies = (movies) => {
        if (!search?.trim()) return movies;
        return movies.filter(
            (m) =>
                m.title.toLowerCase().includes(search.toLowerCase()) ||
                m.categories.toLowerCase().includes(search.toLowerCase())
        );
    };

    // Films filtrés
    const filteredWeekly = filterMovies(weeklyMovies);
    const filteredTendances = filterMovies(tendances);
    const filteredRecommandes = filterMovies(recommandes);
    const filteredNouveautes = filterMovies(nouveautes);

    // Calcul du total (incluant les résultats filtrés)
    const total =
        filteredWeekly.length +
        filteredTendances.length +
        filteredRecommandes.length +
        filteredNouveautes.length;


    // Informer App du total
    useEffect(() => {
        if (onTotalFilms) {
            onTotalFilms(total);
        }
    }, [total, onTotalFilms]);

    return (
        <main
            id="main-content"
            className="d-flex flex-column align-items-center w-100 gap-5"
        >
            {/* Section Hero */}
            <Hero
                title="Inception"
                description="Un voleur qui s'infiltre dans les rêves des autres pour voler leurs secrets découvre qu'il doit réaliser l'impossible : planter une idée plutôt que la voler."
                onDiscover={() => console.log("Découvrir cliqué")}
                onWatchVideo={() => console.log("Voir la vidéo cliqué")}
                onAddToList={() => console.log("Ajouté à la liste")}
            />

            {/* Section "À ne pas manquer cette semaine" (API) */}
            {loading && (
                <div className="text-center w-100">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            )}
            {error && (
                <div className="alert alert-danger w-100 text-center">{error}</div>
            )}
            {!loading && !error && filteredWeekly.length > 0 && (
                <MovieList movies={filteredWeekly} title="À ne pas manquer cette semaine" />
            )}


            {/* Section Tendances actuelles (statique) */}
            <MovieList movies={filteredTendances} title="Tendances actuelles" />

            {/* Section Recommandés (statique) */}
            <MovieList movies={filteredRecommandes} title="Recommandés pour vous" />

            {/* Section Nouveautés (statique) */}
            <MovieList movies={filteredNouveautes} title="Nouveautés" />
        </main>
    );
}

export default Home;