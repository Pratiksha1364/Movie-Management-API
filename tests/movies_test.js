const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../src/app');
const Movie = require('../src/models/movie_model');

beforeEach(async () => {
    // Clear the database before each test
    await Movie.deleteMany({});
});

afterAll(async () => {
    // Close the server and database connection after all tests
    await mongoose.connection.close();
    server.close();
});

describe('Movie API', () => {
    it('should create a new movie', async () => {
        const res = await request(app)
            .post('/movies')
            .send({ title: 'Inception', rating: 9 });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title', 'Inception');
    });

    it('should fetch all movies', async () => {
        await new Movie({ title: 'Movie 1' }).save();
        await new Movie({ title: 'Movie 2' }).save();
        const res = await request(app).get('/movies');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(2);
    });

    it('should fetch a single movie by ID', async () => {
        const movie = await new Movie({ title: 'The Matrix' }).save();
        const res = await request(app).get(`/movies/${movie._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'The Matrix');
    });

    it('should update a movie', async () => {
        const movie = await new Movie({ title: 'Old Title' }).save();
        const res = await request(app)
            .put(`/movies/${movie._id}`)
            .send({ title: 'New Title' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'New Title');
    });

    it('should delete a movie', async () => {
        const movie = await new Movie({ title: 'To be deleted' }).save();
        const res = await request(app).delete(`/movies/${movie._id}`);
        expect(res.statusCode).toEqual(204);
        const foundMovie = await Movie.findById(movie._id);
        expect(foundMovie).toBeNull();
    });
});
