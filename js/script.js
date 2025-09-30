// EXERCICE 1 : Afficher/masquer sections

// On sélectionne toutes les sections qui contiennent une grille de films
const sections = document.querySelectorAll('#main-content section');

sections.forEach(section => {
    const row = section.querySelector('.row.g-4');
    if (!row) return;

    // Création du bouton
    const btn = document.createElement('button');
    btn.textContent = 'Masquer';
    btn.classList.add('btn', 'btn-secondary', 'mb-3');

    // On insère le bouton juste après le titre de la section
    const title = section.querySelector('h2');
    if (title) {
        title.insertAdjacentElement('afterend', btn);
    } else {
        section.insertBefore(btn, section.firstChild);
    }

    // Ajout de l'événement
    btn.addEventListener('click', () => {
        row.classList.toggle('d-none');

        btn.textContent = row.classList.contains('d-none')
            ? 'Afficher'
            : 'Masquer';
    });
});



// EXERCICE 2 : Compteur de films

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Compter toutes les colonnes de films dans les grilles
    const totalFilms = document.querySelectorAll('.movie-card').length;

    // Créer un nouvel élément <p>
    const compteur = document.createElement('p');
    compteur.classList.add('badge', 'mb-1', 'text-bg-secondary');
    compteur.textContent = `Catalogue : ${totalFilms} films disponibles`;

    // Trouver le logo du footer
    const footerLogo = document.querySelector('.footer-logo');

    // Insérer le compteur juste après le logo
    footerLogo.insertAdjacentElement('afterend', compteur);
});



// EXERCICE 3 : Films vus

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner toutes les cartes de films
    const films = document.querySelectorAll('.movie-card');

    // Parcourir chaque carte
    films.forEach(film => {
        // Ajouter un écouteur de clic
        film.addEventListener('click', () => {
            // Toggle de la classe "watched"
            film.classList.toggle('watched');
        });
    });
});



// EXERCICE 4 : Recherche

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner le champ de recherche
    const searchInput = document.querySelector('#navbar-search-input');

    // Créer un message "Aucun résultat"
    const noResult = document.createElement('p');
    noResult.textContent = 'Aucun résultat';
    noResult.style.display = 'none'; // caché par défaut
    noResult.classList.add('text-center', 'mt-3');
    document.querySelector('.trends').prepend(noResult);

    // Écouter la saisie dans le champ
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();

        // Récupérer toutes les colonnes de films
        const films = document.querySelectorAll('.row.g-4 .col-12.col-md-6.col-lg-4');

        let visibleCount = 0;

        films.forEach(film => {
            const title = film.querySelector('h3').textContent.toLowerCase();

            if (title.includes(searchTerm)) {
                film.style.display = 'block';
                visibleCount++;
            } else {
                film.style.display = 'none';
            }
        });

        // Afficher ou cacher le message "Aucun résultat"
        if (visibleCount === 0) {
            noResult.style.display = 'block';
        } else {
            noResult.style.display = 'none';
        }
    });
});