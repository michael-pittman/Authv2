// ==============================================================================
// DEPENDENCIES
// Series of NPM packages that we will use to give our server useful functionality
// ==============================================================================

var bodyParser = require("body-parser");
var path = require("path");
var express = require('express');
var http = require('http');

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();
var passport = require('passport');
var session = require('express-session');
var env = require('dotenv').load();

// ==============================================================================
// BODY PARSER
// This makes it possible for our server to interpret data sent to it
// The code below is pretty standard
// ==============================================================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized:true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// ================================================================================

//Models
var models = require("./models");

//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

require('./config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

// ==============================================================================
// LISTENER
// The below code starts our server
// ==============================================================================

app.use(express.static(__dirname + '/app/public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/public/html/index.html');
});
var server = http.createServer(app).listen(process.env.PORT || 9250);

require('./server/mstsc')(server);