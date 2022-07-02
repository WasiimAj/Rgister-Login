const UserModel = require('../model/user.model');

exports.getSingIn = (req, res) => {
    res.render('signin')
}

exports.postSingIn = (req, res) => {
    console.log(req.body)
    UserModel.CreateNewUser(req.body.name, req.body.email, req.body.password)
    .then(() => {
        res.redirect('/login')
    })
    .catch((err) => {
        console.log(err)
        res.redirect('/signin')
    })
}

exports.getLogIn = (req, res) => {
    res.render('login')
}

exports.postLogIn = (req, res) => {
    UserModel.LogIN(req.body.email, req.body.password)
    .then((id) => {
        req.session.userId = id
        res.redirect('/')
    })
    .catch((err) => {
        console.log(err)
        res.redirect('/login')
    })
}

exports.logOut = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}