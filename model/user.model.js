const mongoose = require('mongoose');
const DataBase = "mongodb://localhost:27017/private";
const bcrypt = require('bcrypt');


// USER SCHEMA
const UserSchem = mongoose.Schema({
    name: String,
    password: String,
    email: String
});


// USER MODEL
const UserModel = mongoose.model("user", UserSchem);


// CREATE NEW USER
exports.CreateNewUser = (name, email, password) => {
    return new Promise ((resolve, reject) => {
        mongoose.connect(DataBase)
    .then(() => {
        return UserModel.findOne({ email:email })
    })
    .then((user) => {
        if (user) {
            reject('Alrady Used!')
        } else {
            return bcrypt.hash(password, 10)
        }
    })
    .then((hasedPassword) => {
        let user = new UserModel({
            name: name,
            email: email,
            password: hasedPassword
        })
        user.save()
    })
    .then(() => {
        resolve()
    })
    .catch((err) => {
        reject(err)
    })
    })
}


// LOGIN USER
exports.LogIN = (email, password) => {
    return new Promise ((resolve, reject) => {
        mongoose.connect(DataBase)
        .then(() => {
            return UserModel.findOne({email:email})
        })
        .then((user) => {
            if (!user) {
                reject('No Email .')
            } else {
                return bcrypt.compare(password, user.password)
                .then((same) => {
                    if (!same) {
                        reject('Password Error')
                    } else {
                        resolve(user._id)
                    }
                })
            }
        })
        .catch((err) => (reject(err)))
    })
}