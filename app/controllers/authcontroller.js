var path = require('path');

var exports = module.exports = {}
 
exports.signup = function(req, res) {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
}

exports.dashboard = function(req, res) {
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
}

exports.client = function (req, res) {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}