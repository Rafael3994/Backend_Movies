var express = require('express');
var router = express.Router();
const axios = require('axios');


const auth = require('../middleware/auth'); 

// Endpoint todas las peliculas
// GET: peliculas
router.get('/', auth, async function(req, res, next) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES}`);
    films = response.data.results;
    res.json(films);
});


// Endpoint busqueda titulo
// GET: peliculas/titulo/:titulo
router.get('/titulo/:titulo', auth, async function(req, res, next) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES}`);
    films = response.data.results;
    filmsList = films.filter((film) =>
        film.title.toLowerCase().indexOf(req.params.titulo.toLowerCase()) !== -1
    );
    res.json(filmsList);
});

// Endpoint busqueda id
// GET: peliculas/id/:id
router.get('/id/:id', auth, async function(req, res, next) {
    const idFilm = req.params.id;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${idFilm}?api_key=cea68b520beecac6718820e4ac576c3a`);
    film = response.data;
    res.json(film);
});


module.exports = router;