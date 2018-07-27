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
    html: '\n    <div style="text-align: center;">\n      <h1>Hello <span style="color: purple;">' + name.firstName + '</span>,</h1> <h2>Thank you signing up. You have been added to the PMM Database which will be used to contact you for future events such as road trips to support the band, band schedules and more currently in the works.</h2>\n      <h3>Our goal is to build and get every person that marched as PMM in our database so that we can have a directory. With your help we can get there so spread the word to sign up from the website.</h3>\n      <h1 style="color: purple"><span style="color: gold;">P</span>MM 1X!!!</h1>\n      <p>If you do not wish to be contacted please repond to this email saying <strong>"PLEASE REMOVE"</strong> and you will be removed from the listing.</p>\n    </div>'
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