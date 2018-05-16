'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _express = require('express');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.get('/', function (req, res) {
    res.send('Server working. Please post at "/contact" to submit a message.');
});

router.post('/', function (req, res, next) {
    var transporter = _nodemailer2.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: 'joseph.fenderson@gmail.com',
            clientId: '15915734946-cuije3mk1f0h6bh390rb31fdhos0gjpa.apps.googleusercontent.com',
            clientSecret: 'fJxFiZJLgqsAqtIfQU6w1xbG',
            refreshToken: '1/eVMu8IMRe-tW7e7Z_itySgfclv2TJlMWDPHa4Lja5es'
        }
    });

    var name = req.body.name;
    var email = req.body.email;
    var number = req.body.number;
    var message = req.body.message;
    var mailOption = {
        from: name + ' <' + email + '>',
        to: '' + email,
        subject: 'New Message from ' + email + ' at pmm_day-site',
        text: message,
        html: '<p>' + message + ', Sender\'s Number is ' + number + '</p>'
    };

    transporter.sendMail(mailOption, function (error, res) {
        // console.log(info)
        if (error) {
            console.log(error);
        } else {
            res.sendStatus(201);
        }
        transporter.close();
    });
    next();
});

exports.default = router;