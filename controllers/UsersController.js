var UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
var serviceUser = require('./../services/user');
const { use } = require('../routes/users');


exports.userUpdate = async function (req, res, next) {
  try {
    const { password, nameUser } = req.body;
    const response = await serviceUser.userUpdate(req.user.email, password, nameUser)
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }

}

exports.getAllUsers = async function (req, res) {
  try {
    const users = await serviceUser.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.getUserById = async function (req, res) {
  try {
    const user = await serviceUser.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}

//TODO: SIN FUNCIONAR
exports.userRegister = async (req, res, next) => {
  try {
    // Recibo los datos por body
    const { email, name, password, roles } = { ...req.body };
    const newUser = await serviceUser.userRegister(email, name, password, roles);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // const user = await UserModel.findByCredentials(email, password)
    // if (!user) {
    //   return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    // }
    // const token = await user.generateAuthToken();
    // console.log(token);
    const user = await serviceUser.userLogin(email, password);
    if (!user) {
      res.status(401).json('Incoerencia en la peticion.');
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

exports.userDelete = async (req, res, next) => {
  // Only user who has admin role;
  try {
    // Eliminamons el usuario
    const result = await UserModel.remove({ _id: req.params.id });
    (result > 0) ? res.status(204).json({}) : res.status(200).json({ message: "El usuario a sido elimnado correctamente." });
  } catch (e) {
    res.status(500).json({ message: "No se pudo hacer la eliminacion." });
  }
}

exports.userLogout = async (req, res, next) => {
  // res.status(200).json('entro');
  try {
    const user = await UserModel.updateOne({ email: req.user.email }, {
      $pull: {
        tokens: { token: [req.token] },
      }
    });

    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
}