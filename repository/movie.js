const pool = require('../config/queris');
const Movie = require('../models/movie');

class MovieRepository {
  async getAllMovies() {
    try {
      const { rows } = await pool.query('SELECT * FROM public.movies');
      return rows.map(row => new Movie(row.id, row.title, row.genres, row.year));
    } catch (error) {
      throw error;
    }
  }

  async getMovieById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM public.movies WHERE id=$1', [id]);
      if (rows.length === 0) return null;
      const { id: movieId, title, genres, year } = rows[0];
      return new Movie(movieId, title, genres, year);
    } catch (error) {
      throw error;
    }
  }

  async createMovie(id, title, genres, year) {
    try {
      const query = 'INSERT INTO public.movies (id, title, genres, year) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [id, title, genres, year];
      const { rows } = await pool.query(query, values);
      const { id: movieId, title: movieTitle, genres: moviegenres, year: movieYear } = rows[0];
      return new Movie(movieId, movieTitle, moviegenres, movieYear);
    } catch (error) {
      throw error;
    }
  }

  async updateMovie(id, title, genres, year) {
    try {
      const query = 'UPDATE public.movies SET title=$1, genres=$2, year=$3 WHERE id=$4 RETURNING *';
      const values = [title, genres, year, id];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) return null;
      const { id: movieId, title: movieTitle, genres: moviegenres, year: movieYear } = rows[0];
      return new Movie(movieId, movieTitle, moviegenres, movieYear);
    } catch (error) {
      throw error;
    }
  }

  async deleteMovie(id) {
    try {
      const query = 'DELETE FROM public.movies WHERE id=$1 RETURNING *';
      const values = [id];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) return null;
      const { id: movieId, title, genres, year } = rows[0];
      return new Movie(movieId, title, genres, year);
    } catch (error) {
      throw error;
    }
  }

  async getMoviesPaginate(page, limit) {
    const startIndex = (page - 1) * limit;
    try {
      const query = `SELECT * FROM public.movies LIMIT ${limit} OFFSET ${startIndex}`;
      const { rows } = await pool.query(query);
      return rows.map(row => new Movie(row.id, row.title, row.genres, row.year));
    } catch (error) {
      throw error;
    }
  }

  async uploadMoviePhoto(id, photoPath) {
    try {
      const { rows } = await pool.query('UPDATE public.movies SET photo_path=$1 WHERE id=$2 RETURNING *', [photoPath, id]);

      if (rows.length === 0) return null;

      const { id: movieId, title, genres, year, photo_path } = rows[0];
      return new Movie(movieId, title, genres, year, photo_path);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MovieRepository();
