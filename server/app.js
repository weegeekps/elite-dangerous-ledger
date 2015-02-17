'use strict';

var express = require('express');
var passport = require('passport');
var GoogleAuthCodeStrategy = require('passport-google-authcode').Strategy;
//var BearerStrategy = require('passport-http-bearer');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var authRoutes = require('./routes/auth');

var app = express();
app.listen(8081);

if (app.get('env') === 'development') {
	var cors = require('express-cors');
	app.use(cors({
		allowedOrigins: ['localhost:*']
	}));
}

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// MongoDB connection
var dbConnect = function () {
	mongoose.connect('mongodb://localhost/elite-dangerous-ledger', {
		server: {
			socketOptions: {
				keepAlive: 1
			}
		}
	});
};
dbConnect(); // Initial connection

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', dbConnect);

// Passport setup
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new GoogleAuthCodeStrategy({
		clientID: '519041885826-dgg3c3vhqh0dj784lbhid3fqns45hhdo.apps.googleusercontent.com',
		clientSecret: 'tBzHAlqZCW9SP5f1lPq_AUHC',
		callbackURL: 'http://localhost:4200/'
	},
	function (accessToken, refreshToken, profile, done) {
		User.findOne({googleId: profile.id}).select('+accessToken').exec(function (err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				// We need to create the user.
				user = new User({
					name: profile.name.givenName + ' ' + profile.name.familyName,
					email: profile.emails[0].value,
					googleId: profile.id,
					accessToken: accessToken
				});
			} else {
				// Update user with new access token. This will invalidate other sessions.
				user.name = profile.name.givenName + ' ' + profile.name.familyName;
				user.accessToken = accessToken;
			}

			user.save(function (err) {
				if (err) {
					done(err);
				}

				return done(null, user);
			});
		});
	}
));

/*passport.use(new BearerStrategy(
 function (token, done) {
 User.findOne({accessToken: token}, function (err, user) {
 if (err) { return done(err); }

 if (!user) { return done(err, false); }

 return done(null, user, {scope: 'all'});
 });
 }
 ));*/

// Authentication Routes
/*app.post('/auth/google/token', passport.authenticate('google-token'), function (req, res) {
 res.send(req.user);
 });*/

// Routes
//app.use('/', routes);
app.use('/auth', authRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		/*res.render('error', {
		 message: err.message,
		 error: err
		 });*/
		res.json(err.message);
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	/*res.render('error', {
	 message: err.message,
	 error: {}
	 });*/
	res.json(err.message);
});


module.exports = app;
