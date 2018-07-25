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

var _nodemailer = require('../config/nodemailer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var router = (0, _express.Router)();
var members = new _table2.default('members');

router.get('/', function (req, res) {
  members.getAll().then(function (info) {
    return res.json(info);
  }).catch(function (err) {
    console.log(err);
  });
});

router.post('/', function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      phoneNumber = _req$body.phoneNumber,
      crabYear = _req$body.crabYear;

  var name = _humanparser2.default.parseName(req.body.name);
  var location = _zipcodes2.default.lookup(req.body.location);
  console.log(location);
  console.log(name);

  var mailOption = {
    from: 'fenderson.joseph@gmail.com', // who the email is coming from..in the contact form
    to: name + ' <' + email + '>', //who the email is going to
    subject: 'Thank you for Signing Up to the PMM Weekend Site', //subject line
    html: '<div>\n    <h2>Hello ' + name.firstName + ', have been added to our PMM Database which will be used to contact you for future events currently in the works.</h2>\n    <p>If you do not wish to be contacted please repond to this email with a simple NO and you will be removed from the listing.</p>\n    </div>'
  };

  members.insert({
    firstName: name.firstName,
    lastName: name.lastName,
    email: email,
    phoneNumber: phoneNumber,
    city: location.city,
    state: location.state,
    crabYear: crabYear
  }).then(function (id) {
    res.json(id);
  }).catch(function (err) {
    console.log(err);
  }).then(function (res) {
    console.log(res);
    _nodemailer.transporter.sendMail(mailOption, function (error, res) {
      if (error) {
        console.log(error);
      } else {
        console.log('email sent!');
        res.sendStatus(201);
      }
      _nodemailer.transporter.close();
    });

    _nodemailer.mailgunTransporter.sendMail(mailOption, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('email sent!');
        console.log(info);
      }
      _nodemailer.transporter.close();
    });
  });
});

module.exports = router;