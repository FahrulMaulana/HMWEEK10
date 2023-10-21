const movieService = require('../service/movie')

const getAllMovies = async (req, res) => {
    try {
        const movies = await movieService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam memperoleh data' });
    }
};

const getMovieById = async (req, res) => {
    const id = req.params.id;

    try {
        const movie = await movieService.getMovieById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }
        res.status  (200).json(movie);
    } catch (error) {
        console.error('Error fetching movie by id', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam memperoleh data' });
    }
};

const getMoviesPaginate = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    try {
        const movies = await movieService.getMoviesPaginate(page, limit);

        const result = {
            result: movies
        };

        if (page > 1) {
            result.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        if (movies.length === limit) {
            result.next = {
                page: page + 1,
                limit: limit,
            };
        }

        res.json(result);
    } catch (error) {
        console.error('Error fetching paginated movies', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam memperoleh data' });
    }
};

const updateMovie = async (req, res) => {
    const id = req.params.id;
    const { title, genres, year } = req.body;

    if (!title || !genres || !year) {
        return res.status(400).json({ message: 'Semua kolom harus diisi' });
    }

    try {
        const updatedMovie = await movieService.updateMovie(id, title, genres, year);

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }

        res.status(200).json({ message: 'Data berhasil diperbarui', data: updatedMovie });
    } catch (error) {
        console.error('Error updating movie', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam memperbarui data' });
    }
};

const createMovie = async (req, res) => {
    const { id, title, genres, year } = req.body;

    if (!id || !title || !genres || !year) {
        return res.status(400).json({ message: 'Semua kolom harus diisi' });
    }

    try {
        const newMovie = await movieService.createMovie(id, title, genres, year);
        res.status(201).json({ message: 'Film baru telah dibuat', data: newMovie });
    } catch (error) {
        console.error('Error creating movie', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam menyimpan data' });
    }
};

const deleteMovie = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedMovie = await movieService.deleteMovie(id);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }

        res.status(200).json({ message: 'Data berhasil dihapus', data: deletedMovie });
    } catch (error) {
        console.error('Error deleting movie', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam menghapus data' });
    }
};

const uploadMoviePhoto = async (req, res) => {
    const id = req.params.id;
    const photoPath = req.file.path;

    try {
        const updatedMovie = await movieService.uploadMoviePhoto(id, photoPath);

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }

        res.status(200).json({ message: 'Foto berhasil diunggah', data: updatedMovie });
    } catch (error) {
        console.error('Error uploading movie photo', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam mengunggah foto' });
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    updateMovie,
    createMovie,
    deleteMovie,
    uploadMoviePhoto,
    getMoviesPaginate
};
