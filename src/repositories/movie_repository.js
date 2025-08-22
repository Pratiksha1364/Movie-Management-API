const Movie = require('../models/movie_model');

const getAllMovies = ({ page, limit }) => {
    // The formula for skip is (page_number - 1) * items_per_page
    const skip = (page - 1) * limit;
    
    // Find movies, skip the ones from previous pages, and limit the results
    return Movie.find().skip(skip).limit(limit);
};
const getMovieById = (id) => Movie.findById(id);
const createMovie = (movieData) => new Movie(movieData).save();
const updateMovie = (id, movieData) => Movie.findByIdAndUpdate(id, movieData, { new: true });
const deleteMovie = (id) => Movie.findByIdAndDelete(id);

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};
