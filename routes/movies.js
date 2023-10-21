const express = require('express');
const movieRouter = express.Router();
const movieController = require('../contoller/movie');
const verifyToken = require('../middleware/verify');
const upload = require('../multer-config')
 ;
movieRouter.get('/api/movie', movieController.getAllMovies);
movieRouter.get('/api/movie/paginate', movieController.getMoviesPaginate);
movieRouter.get('/api/movie/:id', movieController.getMovieById);
movieRouter.post('/api/movie', verifyToken, movieController.createMovie);
movieRouter.put('/api/movie/:id', verifyToken, movieController.updateMovie);
movieRouter.delete('/api/movie/:id', verifyToken, movieController.deleteMovie);
movieRouter.post('/api/movie/upload/:id', upload.single('photo'), movieController.uploadMoviePhoto);

module.exports = movieRouter;
