'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _firebaseFunctions = require('firebase-functions');

var _firebaseFunctions2 = _interopRequireDefault(_firebaseFunctions);

var _serviceAccountKey = require('../../../serviceAccountKey.json');

var serviceAccount = _interopRequireWildcard(_serviceAccountKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pmm-site-a57b9.firebaseio.com"
});

var db = admin.firestore();

exports.default = db;