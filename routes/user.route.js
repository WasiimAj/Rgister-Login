const UserControlaer = require('../controlars/user.controll');
const router = require('express').Router();
const bodyParser = require('body-parser')

router.get('/signin', UserControlaer.getSingIn);

router.post('/signin',bodyParser.urlencoded({extended:false}), UserControlaer.postSingIn);

router.get('/login', UserControlaer.getLogIn)

router.post('/login',bodyParser.urlencoded({extended:false}), UserControlaer.postLogIn)

router.all('/logout', bodyParser.urlencoded({extended:false}) ,UserControlaer.logOut)

module.exports = router;
