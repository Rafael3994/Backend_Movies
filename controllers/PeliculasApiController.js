const axios = require('axios');
const servicePeliculasAPI = require('./../services/peliculasAPI');

exports.getAllMovies =  async function(req, res, next) {
    try {
        const films = await servicePeliculasAPI.getMovies();
        res.status(200).json(films);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getByTittle = async function(req, res, next) {
    const filmsList = servicePeliculasAPI.getByTittle(req.params.titulo);
    res.status(200).json(filmsList);
}

exports.getById =  async function(req, res, next) {
    try {
        const film = await servicePeliculasAPI.getById(idFilm)
        res.status(200).json(film);
    } catch (error) {
        res.status(500).json(error);
    }
}