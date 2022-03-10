var UserModel = require('../models/UserModel');

exports.userUpdate = async (email, password, nameUser) => {
    const filter = { email: email };
    passwordBcrypt = await bcrypt.hash(password, 8)
    const update = { password: passwordBcrypt, name: nameUser };

    UserModel.findOneAndUpdate(filter, update)
        .then((response) => {
            if (response !== null) {
                return new Promise.resolve(response);
            } else {
                return new Promise.reject('error');
            }
        }).catch((error) => {
            return new Promise.reject(error);
        })
}

exports.getAllUsers = () => {
    UserModel.find({}).then((res) => {
        return new Promise.resolve(res);
    }).catch((res) => {
        return new Promise.reject(res);
    });
}

exports.getUserById = (idUser) => {
    try {
        UserModel.findOne({ _id: idUser }).then((res) => {
            return new Promise.resolve(res);
        }).catch((error) => {
            return new Promise.reject(error);
        })
    } catch (error) {
        return error
    }
}

exports.createUser = (email, name, password, roles) => {
    UserModel.create({ name: name, email: email, password: password, address: [], roles: arrRoles })
        .then((res) => {
            if (res === null) {
                return new Promise.reject('Internal error. Please, let you contact with the administrator');
            }
            return new Promise.resolve(res);
        }).catch((error) => {
            return new Promise.reject(error);
        })
}

//TODO: MIRAR
exports.userRegister = async (email, name, password, roles) => {
    try {
        // Valido los datos recibidos. Si son incorrectos, devuelvo ko
        UserModel.findOne({ email: email })
            .then((responseUser) => {
                // Valido que el correo no existe
                if (responseUser !== null) {
                    return new Promise.reject('email incorrecto');
                }
                // Valido que el password tiene el formato correcto (minlength: 6)
                if (password.length < 6) { return new Promise.reject('password incorrecto. Debe tener almenos 6 caracteres.'); }
                let arrRoles = ['user'];
                if (typeof roles !== 'undefined') {
                    arrRoles = arrRoles.concat(roles);
                }
                // Guardo los datos
                this.createUser(email, name, password, roles).then(res => {
                    return new Promise.resolve(res);
                }).catch(error => {
                    return new Promise.reject(error);
                })
            }).catch((error) => {
                return error;
            })
    } catch (error) {
        return error
    }
}

exports.userLogin = async (email, password) => {
    UserModel.findByCredentials(email, password).then(res => {
        if (!res) {
            return new Promise.reject('Login failed! Check authentication credentials');
        }
        res.generateAuthToken().then(token => {
            console.log(token);
            return new Promise.resolve(token);
        });
    })
}