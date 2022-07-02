const bodyParser = require('body-parser');
const express = require('express');

const app = express()
const PORT = 3000;
const path = require('path');

// SESSION & SESSION STORE SETUP
const session = require('express-session')
const sessionStore = require('connect-mongodb-session')(session);

const Store = new sessionStore ({
    uri: 'mongodb://localhost:27017/private',
    collection: 'Sessions'
})

app.use(session({
    secret: 'WEWEWEWEWEWEWEWEWEWEWEWEWEWEWEWE',
    saveUninitialized: false,
    resave: true,
    store: Store
}))


// All Routes
const UserRoutes = require('./routes/user.route');

app.use(UserRoutes);

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.set('views', 'views');
app.use(express.static(__dirname + '/views/'));


// Body Parser
app.use(bodyParser.urlencoded({ extended: false })) // مش شغالة 

// HOME PAGE
app.get('/', (req,res) => {
    res.render('home')
})

app.listen(PORT, (req, res) => {
    console.log(`Server Is Runing In PORT => ${PORT}`)
})