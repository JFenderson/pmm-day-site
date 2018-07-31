'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _express = require('express');

var _nodemailer3 = require('../config/nodemailer');

var _sibApiV3Sdk = require('sib-api-v3-sdk');

var _sibApiV3Sdk2 = _interopRequireDefault(_sibApiV3Sdk);

var _libphonenumberJs = require('libphonenumber-js');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var router = (0, _express.Router)();

router.get('/', function (req, res) {
    res.send('Server working. Please post at "/contact" to submit a message.');
});

router.post('/', function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var number = (0, _libphonenumberJs.formatNumber)(req.body.number, 'National');
    var message = req.body.message;
    var mailOption = {
        from: name + ' <' + email + '>', // who the email is coming from..in the contact form
        to: 'joseph.fenderson@gmail.com', //who the email is going to
        subject: 'New Message from ' + email + ' from the PMM Weekend Site', //subject line
        text: message,
        html: '<div style="text-align: center; margin: auto; margin-right: auto 0; border: 1px solid; padding: 10px; width: 50%; height: auto;">\n        <h1>Hey PMM Admin,</h1> \n        <h1>You have a new message from the PMM Weekend Site</h1>\n        <h2>From: ' + name + '</h2>\n        <h2>Number: ' + number + '</h2>\n        <h2>Message:</h2>\n        <h2>' + message + ' </h2>\n      </div>'
    };

    _nodemailer3.transporter.sendMail(mailOption, function (error, res) {
        if (error) {
            console.log(error);
        } else {
            console.log('email sent!');
            res.sendStatus(201);
        }
        _nodemailer3.transporter.close();
    });

    // sendInBlueTransporter.sendMail(mailOption, (error, res) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('email sent!')
    //         res.sendStatus(201);
    //     }
    //     transporter.close();
    // });

    _nodemailer3.mailgunTransporter.sendMail(mailOption, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('email sent!');
            console.log(info);
        }
        _nodemailer3.transporter.close();
    });
});

exports.default = router;