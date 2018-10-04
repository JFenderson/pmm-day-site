'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _firebaseFunctions = require('firebase-functions');

var _firebaseFunctions2 = _interopRequireDefault(_firebaseFunctions);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _serviceAccountKey = require('../../../serviceAccountKey.json');

var serviceAccount = _interopRequireWildcard(_serviceAccountKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

//setting up google storage buckets
// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: 'gs://pmm-site-a57b9.appspot.com'
};
_firebase2.default.initializeApp(config);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = _firebase2.default.storage();

exports.default = { db: db, storage: storage };