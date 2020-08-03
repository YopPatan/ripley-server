var express = require('express');

var sessionService = require('../services/session');

var router = express.Router();

router.get('/', function(req, res) {
    if (req.headers.token === undefined) {
        res.status(400).json();
    }
    sessionService.isActive(req.headers.token).then(isActive => {
        res.json(isActive);
    });
});

module.exports = router;
