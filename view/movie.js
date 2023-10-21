document.addEventListener('DOMContentLoaded', async () => {
  const movieTable = document.getElementById('movie-table');
  const movieList = document.getElementById('movie-list');
  const searchForm = document.getElementById('search-form');

  const displayMovies = async () => {
      try {
          const response = await fetch('http://localhost:3000/api/movie');
          const movies = await response.json();

          movies.forEach(movie => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${movie.id}</td>
                  <td>${movie.title}</td>
                  <td>${movie.genres}</td>
                  <td>${movie.year}</td>
              `;
              movieList.appendChild(row);
          });

      } catch (error) {
          console.error('Error:', error);
      }
  };

  const searchMovieById = async (id) => {
      try {
          const response = await fetch(`http://localhost:3000/api/movie/${id}`);
          const movie = await response.json();

          if (movie && movie.id) {
              const result = `ID: ${movie.id}, Judul: ${movie.title}, genres: ${movie.genres}, Tahun: ${movie.year}`;
              alert(result);
          } else {
              alert('Film tidak ditemukan');
          }

      } catch (error) {
          console.error('Error:', error);
      }
  };

  displayMovies();

  searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchInput = document.getElementById('search-input');
      const id = parseInt(searchInput.value);

      if (!isNaN(id)) {
          searchMovieById(id);
      } else {
          alert('ID harus berupa angka');
      }
  });
});
