var express = require('express');
var router = express.Router();

const pedidoController = require('../controllers/PedidosController');
const auth = require('../middleware/auth'); 

router.post('/alquilar', auth, pedidoController.newPedido); 

router.get('/user', auth, pedidoController.listUser);

module.exports = router;
