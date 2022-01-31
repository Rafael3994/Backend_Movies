var express = require('express');
var router = express.Router();
var PedidoModel = require('../models/PedidoModel');
var PeliculaModel = require('../models/PeliculaModel');
var UserModel = require('../models/UserModel');

const auth = require('../middleware/auth'); 

// Endpoint crear un pedido (1 película por usuario), (con fecha de alquiler), (con fecha de devolución)
// GET: pedidos
router.post('/', auth, async function(req, response, next) {
    // Recibo los datos por body
    const {idUser, idPelicula} = req.body;
    // Valido los datos recibidos. Si son incorrectos, devuelvo no
    // Valido que el correo no existe
    try {
        const pelicula = await PeliculaModel.findById(idPelicula);
        let resultPelicula = (pelicula !== null) ? pelicula: {};
        const user = await UserModel.findById(idUser);
        let resultUser = (user !== null) ? user: {};

        if (Object.keys(resultUser).length === 0 || Object.keys(resultPelicula).length === 0) {
           return response.status(400).json({});
        }
    
        // var currentDate = new Date();
        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();

        const today = `${dd}-${mm}-${yyyy}`;

        date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        dd = String(date.getDate()).padStart(2, '0');
        mm = String(date.getMonth() + 1).padStart(2, '0');
        yyyy = date.getFullYear();

        const tomorrow = `${dd}-${mm}-${yyyy}`;

         // Guardo los datos
        const pedido = await PedidoModel.create({idUser: idUser, idPelicula: idPelicula, rentalDate: today, returnDate: tomorrow})
        // Respondo ok o ko

        return response.json({message: "Pedido relized."})
        if( pedido === null) {return response.status(500).json({message: 'Internal error. Please, let you contact with the administrator'});}
        
        



        
    } catch (error) {
        response.status(500).json({message: "salio mal."})
    }
});


module.exports = router;
