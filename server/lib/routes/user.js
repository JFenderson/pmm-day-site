'use strict';

var _express = require('express');

var _table = require('../utils/table');

var _table2 = _interopRequireDefault(_table);

var _zipcodes = require('zipcodes');

var _zipcodes2 = _interopRequireDefault(_zipcodes);

var _humanparser = require('humanparser');

var _humanparser2 = _interopRequireDefault(_humanparser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var router = (0, _express.Router)();
var members = new _table2.default('members');

router.get('/', function (req, res) {
  members.getAll().then(function (res) {
    return console.log(res.json());
  }).then(res.sendStatus(200));
});

router.post('/', function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      phoneNumber = _req$body.phoneNumber,
      crabYear = _req$body.crabYear;

  var name = _humanparser2.default.parseName(req.body.name);
  var location = _zipcodes2.default.lookup(req.body.location);

  members.insert({
    firstName: name.firstName, lastName: name.lastName, email: email, phoneNumber: phoneNumber, city: location.city, state: location.state, crabYear: crabYear
  }).then(function (id) {
    console.log(id);
  });
});

module.exports = router;