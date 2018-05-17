'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.charge = undefined;

var _stripe = require('stripe');

var _stripe2 = _interopRequireDefault(_stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stripe = (0, _stripe2.default)(process.env.STRIPE_SK); // define secret key in ENV_VAR

function charge(token, amt) {
    // returning a promise, so when we call .charge, we can use .then(...)
    return stripe.charges.create({
        amount: amt * 100, //amount in cents
        currency: 'usd',
        source: token,
        description: 'Statement description'
    });
};

exports.charge = charge;