'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _stripeCharge = require('../utils/stripeCharge');

var _stripe = require('stripe');

var _stripe2 = _interopRequireDefault(_stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
var stripe = (0, _stripe2.default)('sk_test_YV5UGpBi1SJ0teMkYeG25keW'); // define secret key in ENV_VAR

router.post('/', function (req, res) {
    console.log('this is the req from stripePay', req.body);

    var token = req.body.stripeToken;
    var email = req.body.stripeEmail;

    var charge = stripe.charges.create({
        amount: 999,
        currency: 'usd',
        description: 'Example charge',
        source: token,
        receipt_email: 'purplemarchingmachine96@gmail.com'
    });

    if (function (sucess) {
        res.status(200).json({ message: 'success' });
    }) ;else {
        res.sendStatus(500);
    }

    // charge(token, email)
    //     .then((success) => {
    //         res.status(200).json({ message: 'success'});
    //     })
    //     .catch((err) => {
    //         res.sendStatus(500);
    //     });
});

exports.default = router;