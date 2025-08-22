const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie_controller');

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     responses:
 *       200:
 *         description: A list of movies.
 */
router.get('/movies', movieController.getAllMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: A single movie. }
 *       404: { description: Movie not found. }
 */
router.get('/movies/:id', movieController.getMovieById);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Movie' }
 *     responses:
 *       201: { description: The created movie. }
 *       400: { description: Invalid input. }
 */
router.post('/movies', movieController.createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update an existing movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Movie' }
 *     responses:
 *       200: { description: The updated movie. }
 *       404: { description: Movie not found. }
 */
router.put('/movies/:id', movieController.updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Movie deleted successfully. }
 *       404: { description: Movie not found. }
 */
router.delete('/movies/:id', movieController.deleteMovie);

module.exports = router;
