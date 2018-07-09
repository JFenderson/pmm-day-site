'use strict';

var _express = require('express');

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _table = require('../utils/table');

var _table2 = _interopRequireDefault(_table);

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _zipcodes = require('zipcodes');

var _zipcodes2 = _interopRequireDefault(_zipcodes);

var _humanparser = require('humanparser');

var _humanparser2 = _interopRequireDefault(_humanparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
var user = new _table2.default('person');
var members = new _table2.default('members');

//firebase init
_firebaseAdmin2.default.initializeApp({
  credential: _firebaseAdmin2.default.credential.applicationDefault()
});

var db = _firebaseAdmin2.default.firestore();

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

  console.log('this is the name from humanparser', name, email, phoneNumber, 'this is the location details', location, crabYear);

  members.insert({
    name: name, email: email, phoneNumber: phoneNumber, location: location, crabYear: crabYear
  }).then(function (id) {
    console.log(id);
  });

  user.insert({
    name: name, email: email, phoneNumber: phoneNumber, location: location, crabYear: crabYear
  }).then(function (id) {
    console.log(id);
  });

  // db.collection('members').add({
  //     name: name,
  //     email: email,
  //     phoneNumber: phoneNumber,
  //     location: location,
  //     crabYear: crabYear
  // })
  //   .then(function (docRef) {
  //     console.log('Document written with ID: ', docRef.id)
  //   })
  //   .catch(function (error) {
  //     console.error('Error adding document: ', error)
  //   })
});

module.exports = router;