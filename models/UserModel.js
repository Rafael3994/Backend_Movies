const UserSchema = require('./schemas/UserSchema');
const mongoose = require('mongoose');
const UserModel = mongoose.model("User", UserSchema);




module.exports = UserModel;