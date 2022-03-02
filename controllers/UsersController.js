var UserModel = require('../models/UserModel');

exports.getAllUsers =  async function(req, res) {
    const users = await UserModel.find({});
    let result = ( users.length > 0 )? users: [{}];
    res.status(200).json(result);
}

exports.getUserById =  async function(req, res) {
    const user = await UserModel.findOne({ _id: req.params.id })
    let result = ( user !== null )? user: {};
    res.status(200).json(result);  
}

exports.userRegister = async (req, res, next) => {
    // Recibo los datos por body
    const {email, name, password, roles} = {...req.body};
    
    // Valido los datos recibidos. Si son incorrectos, devuelvo ko
    // Valido que el correo no existe
    const userExists = await UserModel.findOne({ email: email});
    if (userExists !== null) { return res.status(401).json({message: 'email incorrecto'}); }
    // Valido que el password tiene el formato correcto (minlength: 6)
    if (password.length < 6 ) return res.status(401).json({message: 'password incorrecto. Debe tener almenos 6 caracteres.'});
      let arrRoles = ['user'];
      if (typeof roles !== 'undefined') {
        arrRoles = arrRoles.concat(roles);
      }
    // Guardo los datos
      let user = await UserModel.create({name: name, email: email, password: password, address:[], roles: arrRoles})
      if( user === null) return res.status(500).json({message: 'Internal error. Please, let you contact with the administrator'})
      res.status(200).json({message: 'User created!!!!'});
    // Respondo ok o ko
}

exports.userLogin =  async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await UserModel.findByCredentials(email, password)
      if (!user) {
         return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }
      const token = await user.generateAuthToken();
      console.log(token);
      res.status(200).json({ "user": {"email": user.email, "name": user.name}, token })
   } catch (error) {
     console.log(error);
      res.status(400).send(error)
   }
}

exports.userDelete = async (req, res, next) => {
    // Only user who has admin role;
    try {
      // Eliminamons el usuario
      const result = await UserModel.remove({ _id: req.params.id});
      (result > 0) ? res.status(204).json({}) : res.status(200).json({message: "El usuario a sido elimnado correctamente."});
    } catch (e) {
      res.status(500).json({message: "No se pudo hacer la eliminacion."});
    }
}

exports.userLogout = async (req, res , next) => {
  try {
    const result = await UserModel.deleteOne({ token: req.token });
  } catch (e) {
    res.status(500).json({});
  }
}