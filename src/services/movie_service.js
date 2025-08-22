const movieRepository = require('../repositories/movie_repository');
const { NotFoundError, BadRequestError } = require('../errors/errors');

const getAllMovies = async (options) => {
    return await movieRepository.getAllMovies(options);
};
const getMovieById = async (id) => {
    const movie = await movieRepository.getMovieById(id);
    if (!movie) throw new NotFoundError(`Movie with id ${id} not found`);
    return movie;
};

const createMovie = async (movieData) => {
    if (!movieData.title) throw new BadRequestError('Title is required');
    return await movieRepository.createMovie(movieData);
};

const updateMovie = async (id, movieData) => {
    const updatedMovie = await movieRepository.updateMovie(id, movieData);
    if (!updatedMovie) throw new NotFoundError(`Movie with id ${id} not found`);
    return updatedMovie;
};

const deleteMovie = async (id) => {
    const deletedMovie = await movieRepository.deleteMovie(id);
    if (!deletedMovie) throw new NotFoundError(`Movie with id ${id} not found`);
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};
