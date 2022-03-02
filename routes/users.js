var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/UsersController'); 

const auth = require('../middleware/auth'); 
const admin = require('../middleware/admin'); 

/* GET users listing. */
router.get('/', [auth, admin], UsersController.getAllUsers); 

router.get('/:id', [auth, admin], UsersController.getUserById);

router.post('/register', UsersController.userRegister);

router.post('/login', UsersController.userLogin);

router.get('/logout', auth, UsersController.userLogout);
   
router.delete('/:id', [auth, admin], UsersController.userDelete);

module.exports = router;
