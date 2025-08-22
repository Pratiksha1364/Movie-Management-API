const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    director: {
        type: String,
        trim: true,
    },
    releaseYear: {
        type: Number,
    },
    genre: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
}, {
    timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
