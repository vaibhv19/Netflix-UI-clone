const movies = [
  {
    id: 'midnight-echo',
    title: 'Midnight Echo',
    genre: 'Sci-Fi Thriller',
    year: 2024,
    rating: '8.7/10',
    description: 'A detective dives into a citywide signal anomaly that rewrites memories in real time.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    accent: 'Neon noir'
  },
  {
    id: 'aurora-rift',
    title: 'Aurora Rift',
    genre: 'Adventure',
    year: 2023,
    rating: '7.9/10',
    description: 'A team of explorers chase a celestial gateway hidden beneath the Arctic ice.',
    image: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80',
    accent: 'Snowbound drama'
  },
  {
    id: 'velvet-horizon',
    title: 'Velvet Horizon',
    genre: 'Romance',
    year: 2022,
    rating: '8.2/10',
    description: 'Two artists meet across continents and build a life through shared late-night calls.',
    image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=900&q=80',
    accent: 'Heartfelt romance'
  },
  {
    id: 'silver-drift',
    title: 'Silver Drift',
    genre: 'Mystery',
    year: 2025,
    rating: '8.4/10',
    description: 'A small town becomes the stage for a secret that surfaces once every twenty years.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
    accent: 'Suspenseful mystery'
  }
];

const browseGrid = document.getElementById('browse-grid');
const searchInput = document.getElementById('movie-search');

function renderMovies(filter = '') {
  if (!browseGrid) return;

  const query = filter.trim().toLowerCase();
  const filtered = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(query) ||
      movie.genre.toLowerCase().includes(query) ||
      movie.accent.toLowerCase().includes(query)
    );
  });

  browseGrid.innerHTML = filtered.map((movie) => `
    <article class="movie-card">
      <img src="${movie.image}" alt="${movie.title} poster" />
      <div class="movie-card-content">
        <p class="movie-accent">${movie.accent}</p>
        <h3>${movie.title}</h3>
        <p>${movie.genre} • ${movie.year}</p>
        <a href="watch.html?movie=${movie.id}" class="card-link">Watch now</a>
      </div>
    </article>
  `).join('');

  if (!filtered.length) {
    browseGrid.innerHTML = '<p class="empty-state">No matches found. Try a different keyword.</p>';
  }
}

if (browseGrid) {
  renderMovies();
  searchInput?.addEventListener('input', (event) => renderMovies(event.target.value));
}

function hydrateWatchPage() {
  const params = new URLSearchParams(window.location.search);
  const selectedId = params.get('movie') || 'midnight-echo';
  const movie = movies.find((item) => item.id === selectedId) || movies[0];

  const title = document.getElementById('watch-title');
  const description = document.getElementById('watch-description');
  const year = document.getElementById('watch-year');
  const rating = document.getElementById('watch-rating');
  const genre = document.getElementById('watch-genre');
  const poster = document.getElementById('watch-poster');

  if (title) title.textContent = movie.title;
  if (description) description.textContent = movie.description;
  if (year) year.textContent = movie.year;
  if (rating) rating.textContent = movie.rating;
  if (genre) genre.textContent = movie.genre;
  if (poster) {
    poster.src = movie.image;
    poster.alt = `${movie.title} poster`;
  }
}

hydrateWatchPage();
