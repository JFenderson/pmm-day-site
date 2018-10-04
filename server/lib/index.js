'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _db = require('./config/db');

var _db2 = _interopRequireDefault(_db);

var _mail = require('@sendgrid/mail');

var _mail2 = _interopRequireDefault(_mail);

var _googleDb = require('./config/googleDb');

var _googleDb2 = _interopRequireDefault(_googleDb);

var _storage = require('@google-cloud/storage');

var Storage = _interopRequireWildcard(_storage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var port = 3000;

var app = (0, _express2.default)();

var CLIENT_PATH = (0, _path.join)(__dirname, '../../client');
app.use((0, _cors2.default)());
app.use(_express2.default.static(CLIENT_PATH));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.get('/', function (_, res) {
  res.sendFile(_path2.default.join(__dirname, 'index.html'));
});
app.use('/api', _routes2.default);
// app.get('/', (req, res) => {
//     res.render(path.join(CLIENT_PATH + '/index.html'), {
//         stripePublishableKey: process.env.STRIPE_PK
//     }); 
//   });

// Imports the Google Cloud client library.

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
// const storage = new Storage();

// // Makes an authenticated API request.
// storage
//   .getBuckets()
//   .then((results) => {
//     const buckets = results[0];

//     console.log('Buckets:');
//     buckets.forEach((bucket) => {
//       console.log(bucket.name);
//     });
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//   });

var pmmMember = _googleDb2.default.collection('pmmMembers');

pmmMember.get().then(function (snapshot) {
  snapshot.forEach(function (doc) {
    console.log(doc.id, '=>', doc.data());
  });
}).catch(function (err) {
  console.log('Error getting documents', err);
});

app.listen(process.env.PORT || 3000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('server listening');
    (0, _db2.default)();
  }
});