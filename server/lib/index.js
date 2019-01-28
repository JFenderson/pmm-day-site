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

var _mail = require('@sendgrid/mail');

var _mail2 = _interopRequireDefault(_mail);

var _googleDb = require('./config/googleDb');

var _googleDb2 = _interopRequireDefault(_googleDb);

var _storage = require('@google-cloud/storage');

var Storage = _interopRequireWildcard(_storage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
// import configure from './config/db';


var port = 3000;
var CLIENT_PATH = (0, _path.join)(__dirname, '../../client');
var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_express2.default.static(CLIENT_PATH));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.get('/', function (_, res) {
  res.sendFile(_path2.default.join(__dirname, 'index.html'));
});
app.use('/api', _routes2.default);

app.listen(process.env.PORT || 3000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('server listening');
    // configure();
  }
});