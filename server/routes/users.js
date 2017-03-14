var express = require('express');
var router = express.Router();

let userObj = require(APP_PATH+ '/api/controller/UserController.js');
const Authentication = require(APP_PATH + '/api/middlewares/user_TokenAuth.js');

router.post('/addUser' ,userObj.AddUser);
router.get('/allUser' , Authentication ,userObj.AllUser);
router.post('/upload' ,userObj.uploading);
router.get('/singleUser/:id', Authentication ,userObj.GetSingleUser);
router.post('/login',userObj.login);
router.post('/delete',userObj.deleteUser);
router.post('/update/:id' ,userObj.updateUser);
router.post('/confirm',userObj.confirmOtp);
router.post('/logout',userObj.logout);
module.exports = router;
