'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _stripeCharge = require('../utils/stripeCharge');

var _stripe = require('stripe');

var _stripe2 = _interopRequireDefault(_stripe);

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var router = (0, _express.Router)();
var stripe = (0, _stripe2.default)(process.env.STRIPE_SK);

//PAYMENT FOR GOLD PACKAGE ($20.00)
router.post('/gold', function (req, res) {

    var token = req.body.id;
    var email = req.body.email;

    stripe.customers.create({
        email: email
    }).then(function (customer) {
        return stripe.customers.createSource(customer.id, {
            source: 'tok_visa'
        });
    }).then(function (source) {
        return stripe.charges.create({
            amount: 2000,
            currency: 'usd',
            description: 'For PMM Weekend',
            receipt_email: 'purplemarchingmachine96@gmail.com',
            customer: source.customer
        });
    }).then(function (charge) {
        res.send(charge);
    }).catch(function onError(error) {
        if (error.status === 400) {
            console.log('Bad request, often due to missing a required parameter.');
        } else if (error.status === 401) {
            console.log('No valid API key provided.');
        } else if (error.status === 404) {
            console.log('The requested resource doesn\'t exist.');
        } else if (error.status === 500) {
            console.log('Purchase Failed');
        }
    });

    //   //SENDING MAILGUN REGISTRATION FOR EMAIL UPDATES
    // var api_key = process.env.MAILGUN_SK;
    // var domain = process.env.MAILGUN_DOMAIN;
    // ;
    // var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});   

    // var data = {
    // from: 'Excited User <me@samples.mailgun.org>',
    // to: `${email}, YOU@YOUR_DOMAIN_NAME'`,
    // subject: 'Hello',
    // text: 'Thank you for you Payment..See you at PMM Weekend!'
    // };

    // mailgun.messages().send(data, function (error, body) {
    // console.log(body);
    // });
});

// PAYMENT FOR PURPLE PACKAGE($10.00)
router.post('/purple', function (req, res) {

    var token = req.body.id;
    var email = req.body.email;
    var card = req.body.card.id;

    stripe.customers.create({
        email: email
        //   source: card,
    }).then(function (customer) {
        return stripe.customers.createSource(customer.id, {
            source: 'tok_visa'
        });
    }).then(function (source) {
        return stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            description: 'For PMM Weekend',
            receipt_email: 'purplemarchingmachine96@gmail.com',
            customer: source.customer
        });
    }).then(function (charge) {
        res.send(charge);
    }).catch(function onError(error) {
        if (error.status === 400) {
            console.log('Bad request, often due to missing a required parameter.');
        } else if (error.status === 401) {
            console.log('No valid API key provided.');
        } else if (error.status === 404) {
            console.log('The requested resource doesn\'t exist.');
        } else if (error.status === 500) {
            console.log('Purchase Failed');
        }
    });
});

//PAYMENT FOR WHITE PACKAGE($7.00)
router.post('/white', function (req, res) {

    var token = req.body.id;
    var email = req.body.email;

    stripe.customers.create({
        email: email
    }).then(function (customer) {
        return stripe.customers.createSource(customer.id, {
            source: 'tok_visa'
        });
    }).then(function (source) {
        return stripe.charges.create({
            amount: 700,
            currency: 'usd',
            description: 'For PMM Weekend',
            receipt_email: 'purplemarchingmachine96@gmail.com',
            customer: source.customer
        });
    }).then(function (charge) {
        res.send(charge);
    }).catch(function onError(error) {
        if (error.status === 400) {
            console.log('Bad request, often due to missing a required parameter.');
        } else if (error.status === 401) {
            console.log('No valid API key provided.');
        } else if (error.status === 404) {
            console.log('The requested resource doesn\'t exist.');
        } else if (error.status === 500) {
            console.log('Purchase Failed');
        }
    });
});
exports.default = router;