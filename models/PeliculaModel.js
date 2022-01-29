const mongoose = require('../config/mongoose');
const PeliculaSchema = require('./schemas/PeliculaSchema');

const PeliculaModel = mongoose.model('Peliculas', PeliculaSchema);

module.exports = PeliculaModel;