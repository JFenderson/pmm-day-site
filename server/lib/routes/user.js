'use strict';

var _express = require('express');

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _table = require('../utils/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
var user = new _table2.default('person');

router.post('/', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      phoneNumber = _req$body.phoneNumber,
      location = _req$body.location,
      crabYear = _req$body.crabYear;

  user.insert({
    name: name, email: email, phoneNumber: phoneNumber, location: location, crabYear: crabYear
  }).then(function (id) {
    console.log(id);
  });
});
//   // Initialize Firebase
//   var config = {
//     apiKey: process.env.FIREBASE_APIKEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
//   };
//   firebase.initializeApp(config);

// router.post('/', (req,res)=> {
//     const { name, email, location, crabYear } = req.body;

// })

module.exports = router;