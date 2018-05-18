'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _stripeCharge = require('../utils/stripeCharge');

var router = (0, _express.Router)();

router.post('/', function (req, res) {
    var tokenId = req.body.token.id;
    var customer = 2000;
    // let amount = req.body.token.amount;
    (0, _stripeCharge.charge)(tokenId, amount).then(function (success) {
        res.status(200).json({ message: 'success' });
    }).catch(function (err) {
        res.sendStatus(500);
    });
});

exports.default = router;