'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mailgunTransporter = exports.sendInBlueTransporter = exports.transporter = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _sibApiV3Sdk = require('sib-api-v3-sdk');

var _sibApiV3Sdk2 = _interopRequireDefault(_sibApiV3Sdk);

var _nodemailerSendinblueTransport = require('nodemailer-sendinblue-transport');

var _nodemailerSendinblueTransport2 = _interopRequireDefault(_nodemailerSendinblueTransport);

var _nodemailerMailgunTransport = require('nodemailer-mailgun-transport');

var _nodemailerMailgunTransport2 = _interopRequireDefault(_nodemailerMailgunTransport);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var transporter = _nodemailer2.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN
    }
});

var sendInBlueTransporter = _nodemailer2.default.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    service: 'SendinBlue',
    auth: {
        user: process.env.SENDINBLUE_USER,
        pass: process.env.SENDINBLUE_PW
    }
});

var mgAuth = {
    auth: {
        api_key: process.env.MAILGUN_PK,
        domain: process.env.MAILGUN_DOMAIN
    }
};

var mailgunTransporter = _nodemailer2.default.createTransport((0, _nodemailerMailgunTransport2.default)(mgAuth));

exports.transporter = transporter;
exports.sendInBlueTransporter = sendInBlueTransporter;
exports.mailgunTransporter = mailgunTransporter;