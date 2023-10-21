const movieRepository = require('../repository/movie');

class MovieService {
  async getAllMovies() {
    try {
      return await movieRepository.getAllMovies();
    } catch (error) {
      throw error;
    }
  }

  async getMovieById(id) {
    try {
      return await movieRepository.getMovieById(id);
    } catch (error) {
      throw error;
    }
  }

  async createMovie(id, title, genres, year) {
    try {
      return await movieRepository.createMovie(id, title, genres, year);
    } catch (error) {
      throw error;
    }
  }

  async updateMovie(id, title, genres, year) {
    try {
      return await movieRepository.updateMovie(id, title, genres, year);
    } catch (error) {
      throw error;
    }
  }

  async deleteMovie(id) {
    try {
      return await movieRepository.deleteMovie(id);
    } catch (error) {
      throw error;
    }
  }

  async getMoviesPaginate(page, limit) {
    try {
      return await movieRepository.getMoviesPaginate(page, limit);
    } catch (error) {
      throw error;
    }
  }

  async uploadMoviePhoto(id, photoPath) {
    try {
      return await movieRepository.uploadMoviePhoto(id, photoPath);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MovieService();
