'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login', passport.authenticate('google-authcode', {session: false}), function (req, res) {
	// Check body for user stuff and things.
	// Then generate a new token.
	res.json(req.user);
});

/*router.post('/login', function (req, res, next) {
 passport.authenticate('google-authcode', {session: false}, function (err, user, info) {
 if (err) {
 return next(err);
 }
 if (!user) {
 return res.redirect('/login');
 }
 req.logIn(user, function (err) {
 if (err) {
 return next(err);
 }
 return res.redirect('/users/' + user.username);
 });
 })(req, res, next);
 });*/

// TODO: /logout method

module.exports = router;
