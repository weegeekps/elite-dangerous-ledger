'use strict';

var express = require('express');
var router = express.Router();

// GET selected user information
router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    res.json(req.user);
});

module.exports = router;
