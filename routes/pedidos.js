var express = require('express');
var router = express.Router();

const pedidoController = require('../controllers/PedidosController');
const auth = require('../middleware/auth'); 

router.post('/', auth, pedidoController.newPedido); 

module.exports = router;
