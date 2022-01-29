const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
    unique: true,
  },
  idPelicula: {
    type: String,
    required: true,
  },
  rentalDate: {
    type: String,
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  },
},
);

PedidoSchema.methods.toJSON = function () {
  const pedido = this.toObject();
  delete pedido.__v;
  return pedido;
}

module.exports = PedidoSchema;