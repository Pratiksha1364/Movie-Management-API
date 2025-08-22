const movieService = require('../services/movie_service');

const getAllMovies = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        
        const movies = await movieService.getAllMovies({ page, limit });
        res.status(200).json(movies);
    } catch (error) { 
        next(error); 
    }
};

const getMovieById = async (req, res, next) => {
    try {
        res.status(200).json(await movieService.getMovieById(req.params.id));
    } catch (error) { next(error); }
};

const createMovie = async (req, res, next) => {
    try {
        res.status(201).json(await movieService.createMovie(req.body));
    } catch (error) { next(error); }
};

const updateMovie = async (req, res, next) => {
    try {
        res.status(200).json(await movieService.updateMovie(req.params.id, req.body));
    } catch (error) { next(error); }
};

const deleteMovie = async (req, res, next) => {
    try {
        await movieService.deleteMovie(req.params.id);
        res.status(204).send();
    } catch (error) { next(error); }
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};
