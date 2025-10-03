// Configuration de base
const API_KEY = '08a341931ab5f5dcee467baeb4a68c76';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Fonction principale : récupérer 6 films populaires
async function getWeeklyMustWatch() {
    try {
        showLoading(true);

        // Exemple : films populaires (tu peux changer par "now_playing" ou "top_rated")
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        const movies = data.results.slice(0, 6); // On garde 6 films

        // Pour chaque film, on récupère les détails (runtime + genres)
        const detailedMovies = await Promise.all(
            movies.map(async (movie) => {
                const res = await fetch(`${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=fr-FR`);
                return res.ok ? res.json() : movie;
            })
        );

        displayWeeklyMovies(detailedMovies);

    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
        showError(`Erreur: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

// Fonction d’affichage de la section
function displayWeeklyMovies(movies) {
    const main = document.getElementById('main-content');

    // Création de la section
    const section = document.createElement('section');
    section.className = "weekly py-5 w-100";
    section.setAttribute("aria-labelledby", "weekly-title");

    section.innerHTML = `
        <div class="container">
            <h2 id="weekly-title" class="mb-4">À ne pas manquer cette semaine</h2>
            <div class="row g-4">
                ${movies.map(movie => createMovieCard(movie)).join('')}
            </div>
        </div>
    `;

    // Insertion AVANT la section Tendances actuelles
    const trendsSection = document.querySelector('.trends');
    main.insertBefore(section, trendsSection);
}

// Fonction utilitaire pour générer une carte film
function createMovieCard(movie) {
    const title = movie.title || movie.name;
    const year = movie.release_date ? movie.release_date.split('-')[0] : '';
    const runtime = movie.runtime ? formatRuntime(movie.runtime) : 'N/A';
    const genres = movie.genres ? movie.genres.map(genre => genre.name).join(', ') : '';
    const rating = movie.vote_average ? (movie.vote_average / 2).toFixed(1) : '0';

    // Génération d'étoiles (arrondi à 5)
    const stars = generateStars(rating);

    return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card movie-card h-100 text-light">
                <div class="movie-image">
                    <img src="${IMAGE_BASE_URL}${movie.poster_path}" 
                         class="card-img-top img-fluid" 
                         alt="Affiche du film ${title} (${year})">
                </div>
                <div class="card-body d-flex flex-column align-items-center gap-1">
                    <h3 class="card-title text-center">${title} (${year})</h3>
                    <p class="card-text small mb-1 badge text-bg-secondary">
                        <span class="visually-hidden">Catégories : </span>${genres}
                    </p>
                    <div class="mb-1">
                        <span aria-hidden="true">${stars}</span>
                        <span class="visually-hidden">Note : ${rating} étoiles sur 5</span>
                    </div>
                    <p class="card-text small mb-3">
                        <span aria-hidden="true">${runtime}</span>
                        <span class="visually-hidden">Durée : ${runtime}</span>
                    </p>
                    <a href="#" class="btn btn-stream mt-auto w-100"
                       aria-label="Regarder ${title} (${year})">
                        Regarder
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Générer étoiles ★★★★☆
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars);
}

// Formater durée en "XhYY"
function formatRuntime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes.toString().padStart(2, '0')}`;
}

// Fonctions utilitaires déjà présentes
function showLoading(show) {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = show ? 'block' : 'none';
    }
}

function showError(message) {
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Lancer au chargement
document.addEventListener('DOMContentLoaded', getWeeklyMustWatch);