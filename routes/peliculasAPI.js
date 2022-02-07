var express = require('express');
var router = express.Router();

const PeliculasApiController = require('../controllers/PeliculasApiController');
const auth = require('../middleware/auth'); 

// Endpoint todas las peliculas
// GET: peliculas
router.get('/', auth,  PeliculasApiController.getAllMovies);


// Endpoint busqueda titulo
// GET: peliculas/titulo/:titulo
router.get('/titulo/:titulo', auth, PeliculasApiController.getByTittle);

// Endpoint busqueda id
// GET: peliculas/id/:id
router.get('/id/:id', auth, PeliculasApiController.getById);


module.exports = router;