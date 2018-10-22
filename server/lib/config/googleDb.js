'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _serviceAccountKey = require('../../../serviceAccountKey.json');

var serviceAccount = _interopRequireWildcard(_serviceAccountKey);

var _storage = require('@google-cloud/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.GOOGLE_DATEBASE_URL,
  storageBucket: process.env.GOOGLE_STORAGE_BUCKET
});

var firestore = admin.firestore();
var storage = admin.storage();
var settings = { /* your settings... */timestampsInSnapshots: true };
firestore.settings(settings);

var bucket = admin.storage().bucket();
app.storage();
//setting up google storage buckets
// Set the configuration for your app
// TODO: Replace with your project's config object
// Initialize Firebase
var config = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: process.env.GOOGLE_AUTH_DOMAIN,
  databaseURL: process.env.GOOGLE_DATABASE_URL,
  projectId: process.env.GOOGLE_PROJECTID,
  storageBucket: process.env.GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.GOOGLE_MESSAGEID
};
// var storage = firebase.storage().ref();

// let storage = firebase.app().storage('gs://pmm-site-a57b9.appspot.com');

exports.default = { firestore: firestore, storage: storage, config: config };