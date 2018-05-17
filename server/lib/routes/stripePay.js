'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _stripeCharge = require('../utils/stripeCharge');

var router = (0, _express.Router)();

router.post('/', function (req, res) {
    console.log(req.body);
    res.send('test');
    // let tokenId = req.body.token.id;
    // let customer = 2000;
    // // let amount = req.body.token.amount;
    // charge(tokenId, amount)
    //     .then((success) => {
    //         res.status(200).json({ message: 'success'});
    //     })
    //     .catch((err) => {
    //         res.sendStatus(500);
    //     });
});

exports.default = router;