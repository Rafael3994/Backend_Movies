const axios = require('axios');

exports.getAllMovies =  async function(req, res, next) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES}`);
    films = response.data.results;
    res.status(200).json(films);
}

exports.getByTittle = async function(req, res, next) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES}`);
    films = response.data.results;
    filmsList = films.filter((film) =>
        film.title.toLowerCase().indexOf(req.params.titulo.toLowerCase()) !== -1
    );
    res.status(200).json(filmsList);
}

exports.getById =  async function(req, res, next) {
    const idFilm = req.params.id;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${idFilm}?api_key=cea68b520beecac6718820e4ac576c3a`);
    film = response.data;
    res.status(200).json(film);
}