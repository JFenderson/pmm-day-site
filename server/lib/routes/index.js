'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _routing = require('../middleware/routing.mw');

var _routing2 = _interopRequireDefault(_routing);

var _gmail = require('./gmail');

var _gmail2 = _interopRequireDefault(_gmail);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _stripePay = require('./stripePay');

var _stripePay2 = _interopRequireDefault(_stripePay);

var _photos = require('./photos');

var _photos2 = _interopRequireDefault(_photos);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var router = (0, _express.Router)();

router.use('/charge', _stripePay2.default);
router.use('/contact', _gmail2.default);
router.use('/user', _user2.default);
router.use('/photos', _photos2.default);

exports.default = router;