'use strict';

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    googleId: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema, 'users');
