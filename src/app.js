const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieRoutes = require('./routes/movie_routes');
const errorHandler = require('./middleware/errorHandler');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./db/mongoose');

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie Management API',
            version: '1.0.0',
            description: 'A simple API to manage movies with CRUD operations.',
        },
        components: {
            schemas: {
                Movie: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        director: { type: 'string' },
                        releaseYear: { type: 'number' },
                        genre: { type: 'string' },
                        rating: { type: 'number' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use(movieRoutes);

// Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = { app, server };
