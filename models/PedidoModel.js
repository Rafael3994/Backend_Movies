const mongoose = require('mongoose');
const PedidoSchema = require('./schemas/PedidoSchema');

const PedidoModel = mongoose.model('Pedidos', PedidoSchema);

module.exports = PedidoModel;