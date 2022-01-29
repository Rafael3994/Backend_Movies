const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    contentRating: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }
});


PeliculaSchema.methods.toJSON = function () {
    const pelicula = this.toObject();
    return pelicula ;
}


module.exports = PeliculaSchema;