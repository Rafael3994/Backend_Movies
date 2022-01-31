const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { use } = require("../../routes/users");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  address:[{street: String, zip: String, city: String, country: String}],
  role: {
    type: String,
    default: 'user',
    required: false
  },
  tokens: [{
      token: {
        type: String,
        required: true
      }
  }],
},
);

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  delete user.role;
  delete user.__v;
  return user ;
}

UserSchema.methods.simpleUser = function () {
  const user = this.toObject();
  delete user._id;
  delete user.password;
  delete user.tokens;
  delete user.role;
  delete user.__v;
  return user ;
}

UserSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
     user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

UserSchema.methods.generateAuthToken = async function() {
    console.log('generateAuthToken');
  // Generate an auth token for the user
  const user = this;
  console.log(user.name);
  const token = jwt.sign({_id: user._id, name: user.name, email: user.email, role:user.role }, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({token:token})
  await user.save()
  return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await UserModel.findOne({ email: email} )
  if (!user) {
     throw new Error({ error: 'Invalid login credentials' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
     throw new Error({ error: 'Invalid login credentials' })
  }
  return user
}

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserSchema;