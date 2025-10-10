const API_KEY = '08a341931ab5f5dcee467baeb4a68c76';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';



// Récupérer 6 films populaires
export async function getWeeklyMustWatch() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        const movies = data.results.slice(0, 6);
        // Pour chaque film, on récupère les détails (runtime + genres)
        const detailedMovies = await Promise.all(
            movies.map(async (movie) => {
                const res = await fetch(`${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=fr-FR`);
                if (!res.ok) return movie;
                const details = await res.json();
                return {
                    id: details.id,
                    title: details.title,
                    year: details.release_date ? details.release_date.split('-')[0] : 'N/A',
                    rating: details.vote_average ? (details.vote_average / 2).toFixed(1) : '0',
                    poster: details.poster_path ? `${IMAGE_BASE_URL}${details.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
                    categories: details.genres ? details.genres.map(g => g.name).join(', ') : 'N/A',
                    duration: details.runtime ? formatRuntime(details.runtime) : 'N/A',
                };
            })
        );
        return detailedMovies;
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
        return [];
    }
}

// Formater durée en "XhYY"
function formatRuntime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes.toString().padStart(2, '0')}`;
}