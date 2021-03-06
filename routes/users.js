var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/UsersController'); 

const auth = require('../middleware/auth'); 
const admin = require('../middleware/admin'); 

/* GET users listing. */
router.get('/admin/getAllUsers', [auth, admin], UsersController.getAllUsers); 

router.get('admin/:id', [auth, admin], UsersController.getUserById);

router.post('/register', UsersController.userRegister);

router.post('/login', UsersController.userLogin);

router.get('/logout', auth, UsersController.userLogout);

router.put('/update', auth, UsersController.userUpdate);
   
router.delete('/:id', [auth, admin], UsersController.userDelete);

module.exports = router;
