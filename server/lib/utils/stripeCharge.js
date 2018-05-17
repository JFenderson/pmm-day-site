'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.charge = undefined;

var _stripe = require('stripe');

var _stripe2 = _interopRequireDefault(_stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stripe = (0, _stripe2.default)('sk_test_YV5UGpBi1SJ0teMkYeG25keW'); // define secret key in ENV_VAR

function charge(token, amt) {
    // returning a promise, so when we call .charge, we can use .then(...)
    return stripe.charge.create({
        amount: amt * 2000, //amount in cents
        currency: 'usd',
        source: token,
        description: 'PMM Weekend'
    });
};

exports.charge = charge;