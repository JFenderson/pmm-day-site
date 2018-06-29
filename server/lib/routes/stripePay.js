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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
var stripe = (0, _stripe2.default)(process.env.STRIPE_SK); // define secret key in ENV_VAR

//PAYMENT FOR GOLD PACKAGE ($20.00)
router.post('/gold', function (req, res) {
    console.log('this is the req from stripePay', req.body);
    console.log('stripe token', req.body.id);

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
            amount: 2000,
            currency: 'usd',
            description: 'For PMM Weekend',
            receipt_email: 'purplemarchingmachine96@gmail.com',
            customer: source.customer
        });
    }).then(function (charge) {
        res.send(charge);
    }).catch(function (err) {
        console.log("Error:", err);
        res.status(500).send({ error: "Purchase Failed" });
    });

    //SENDING MAILGUN REGISTRATION FOR EMAIL UPDATES
    var api_key = process.env.MAILGUN_SK;
    var domain = process.env.MAILGUN_DOMAIN;
    ;
    var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

    var data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: email + ', YOU@YOUR_DOMAIN_NAME\'',
        subject: 'Hello',
        text: 'Thank you for you Payment..See you at PMM Weekend!'
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
});

// PAYMENT FOR PURPLE PACKAGE($10.00)
router.post('/purple', function (req, res) {
    console.log('this is the req from stripePay', req.body);
    console.log('stripe token', req.body.id);

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
    }).catch(function (err) {
        console.log("Error:", err);
        res.status(500).send({ error: "Purchase Failed" });
    });
});

//PAYMENT FOR WHITE PACKAGE($7.00)
router.post('/white', function (req, res) {
    console.log('this is the req from stripePay', req.body);
    console.log('stripe token', req.body.id);

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
            amount: 700,
            currency: 'usd',
            description: 'For PMM Weekend',
            receipt_email: 'purplemarchingmachine96@gmail.com',
            customer: source.customer
        });
    }).then(function (charge) {
        res.send(charge);
    }).catch(function (err) {
        console.log("Error:", err);
        res.status(500).send({ error: "Purchase Failed" });
    });
});
exports.default = router;