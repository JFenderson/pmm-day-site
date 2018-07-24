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
        user: 'joseph.fenderson@gmail.com',
        clientId: "15915734946-cuije3mk1f0h6bh390rb31fdhos0gjpa.apps.googleusercontent.com",
        clientSecret: "fJxFiZJLgqsAqtIfQU6w1xbG",
        refreshToken: "1/eVMu8IMRe-tW7e7Z_itySgfclv2TJlMWDPHa4Lja5es"
    }
});

var sendInBlueTransporter = _nodemailer2.default.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    service: 'SendinBlue',
    auth: {
        user: 'fenderson.joseph@gmail.com',
        pass: '6q1rVFDOBIG3Rg0U'
    }
});

var mgAuth = {
    auth: {
        api_key: 'key-e73adf48b4acfc0a35cdc70b431faa0c',
        domain: 'sandboxde3a03b6aac24cd5aee0550866383b54.mailgun.org'
    }
};

var mailgunTransporter = _nodemailer2.default.createTransport((0, _nodemailerMailgunTransport2.default)(mgAuth));

exports.transporter = transporter;
exports.sendInBlueTransporter = sendInBlueTransporter;
exports.mailgunTransporter = mailgunTransporter;