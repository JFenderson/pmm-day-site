'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _gmail = require('./gmail');

var _gmail2 = _interopRequireDefault(_gmail);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _stripePay = require('./stripePay');

var _stripePay2 = _interopRequireDefault(_stripePay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.use('/charge', _stripePay2.default);
router.use('/contact', _gmail2.default);
router.use('/signup', _user2.default);

exports.default = router;