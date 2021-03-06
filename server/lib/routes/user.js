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

var _googleDb = require('../config/googleDb');

var _googleDb2 = _interopRequireDefault(_googleDb);

var _sibApiV3Sdk = require('sib-api-v3-sdk');

var _sibApiV3Sdk2 = _interopRequireDefault(_sibApiV3Sdk);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _nodemailer = require('../config/nodemailer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var router = (0, _express.Router)();
var members = new _table2.default('members');
var pmmMember = _googleDb2.default.firestore.collection('pmmMembers').doc();
var defaultClient = _sibApiV3Sdk2.default.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_V3;

router.get('/', function (req, res) {
  pmmMember.get().then(function (snapshot) {
    snapshot.forEach(function (doc) {
      res.json(doc.data());
    });
  }).catch(function (err) {
    console.log('Error getting documents', err);
  });
});

router.post('/signup', function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      phoneNumber = _req$body.phoneNumber,
      crabYear = _req$body.crabYear;

  var name = _humanparser2.default.parseName(req.body.name);
  var location = _zipcodes2.default.lookup(req.body.location);
  var apiInstance = new _sibApiV3Sdk2.default.ContactsApi();
  var createContact = new _sibApiV3Sdk2.default.CreateContact(email);
  var contactEmails = new _sibApiV3Sdk2.default.AddContactToList(email); // AddContactToList | Emails addresses of the contacts

  var data = {
    firstName: name.firstName,
    lastName: name.lastName,
    email: email,
    phoneNumber: phoneNumber,
    city: location.city,
    state: location.state,
    crabYear: crabYear
  };

  var options = { "email": email,
    "attributes": {
      "FName": data.firstName,
      "LName": data.lastName,
      "phone": data.phoneNumber
    } };

  // // var createContact = new SibApiV3Sdk.CreateContact();
  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);

  //   console.log(body);
  // });

  // apiInstance.addContactToList(contactEmails)
  // .then(function(data) {
  //   console.log('API called successfully. Returned data: ' + data);
  // }, function(error) {
  //   console.error(error);
  // });

  apiInstance.createContact(options).then(function (data) {
    console.log(data);
  }).catch(function (error) {
    console.log(error);
  });

  var mailOption = {
    from: 'fenderson.joseph@gmail.com', // who the email is coming from..in the contact form
    to: name + ' <' + email + '>', //who the email is going to
    subject: 'Thank you for Signing Up to the PMM Weekend Site', //subject line
    html: '\n    <div style="text-align: center;">\n      <h1>Hello <span style="color: purple;">' + name.firstName + ' ' + name.lastName + '</span>,</h1> \n      <h2>Thank you signing up. You have been added to the PMM Database which will be used to contact you for future events such as road trips to support the band, band schedules and more currently in the works.</h2>\n      <h3>Our goal is to build and get every person that marched as PMM in our database so that we can have a directory. With your help we can get there so spread the word to sign up from the website.</h3>\n      <h1 style="color: purple"><span style="color: gold;">P</span>MM 1X!!!</h1>\n      <p>If you do not wish to be contacted please repond to this email saying <strong>"PLEASE REMOVE"</strong> and you will be removed from the listing.</p>\n    </div>'
  };

  pmmMember.set(data).then(function (ref) {
    res.json(ref.writeTime.toDate());
    console.log('added!');
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
  }).catch(function (err) {
    console.log('There was an error posting users', err);
  });
});

module.exports = router;