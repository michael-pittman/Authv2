var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {
	app.get('/signup', authController.signup);

	app.get('/dashboard',isLoggedIn, authController.dashboard);

	app.get('/client', isLoggedIn, authController.client);

	app.get('/logout',authController.logout);

	app.post('/signup', passport.authenticate('local-signup', {
	        successRedirect: '/dashboard',
	        failureRedirect: '/signup'
	    } 
	));

	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated())
	        return next();
	    res.redirect('/signin');
	};
}