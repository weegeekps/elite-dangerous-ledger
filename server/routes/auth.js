'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.js');

router.post('/login', passport.authenticate('google-authcode', {session: false}), function (req, res) {
	res.json(req.user);
});

router.post('/validate', function (req, res) {
	if (!req.body.accessToken && !req.body.userId) {
		return res.sendStatus(400);
	}

	User.findOne({accessToken: req.body.accessToken, _id: req.body.userId}).exec(function (err, user) {
		if (err) {
			console.log(err);
			return res.status(500).json(err);
		}

		if (user) {
			return res.json(req.body);
		}

		return res.sendStatus(401);
	}, function (err) {
		return res.status(500).json(err);
	});
});

router.get('/logout/:id', function (req, res) {
	if (!req.params.id) {
		return res.sendStatus(400);
	}

	User.update({_id: req.params.id}, {$set: {accessToken: null}}).exec(function (err) {
		if (err) {
			res.sendStatus(500);
		}

		return res.sendStatus(200);
	});
});

module.exports = router;
