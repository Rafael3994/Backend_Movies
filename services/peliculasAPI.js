exports.getMovies = () => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES}`)
        .then((res) => {
            return new Promise.resolve(res.data.results);
        }).catch((error) => {
            return new Promise.reject(error);
        })
}

exports.getByTittle = async (title) => {
    try {
        const films = await this.getMovies();
        filmsList = films.filter((film) =>
            film.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
        );
        return filmsList;
    } catch (error) {
        console.log(error);
    }
}

exports.getById = (idFilm) => {
    axios.get(`https://api.themoviedb.org/3/movie/${idFilm}?api_key=cea68b520beecac6718820e4ac576c3a`)
        .then((res) => {
            return new Promise.resolve(res.data);
        }).catch((error) => {
            return new Promise.reject(error);
        })
}