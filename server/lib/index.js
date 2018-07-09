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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({ silent: true });


_awsSdk2.default.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
_awsSdk2.default.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
_awsSdk2.default.config.region = process.env.AWS_REGION;
var bucketName = process.env.AWS_S3_BUCKET;

var s3 = new _awsSdk2.default.S3();

var port = 3000;

var app = (0, _express2.default)();

var CLIENT_PATH = (0, _path.join)(__dirname, '../../client');
app.use((0, _cors2.default)());
app.use(_express2.default.static(CLIENT_PATH));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use('/api', _routes2.default);

app.get('/', function (req, res) {
    res.render(_path2.default.join(CLIENT_PATH + '/index.html'), {
        stripePublishableKey: process.env.STRIPE_PK
    });
});

var images = '../../client/images';

app.get('/images', function (req, res) {
    s3.listBuckets(function (err, data) {
        console.log(data);
        console.log(err);
    });
});

app.listen(process.env.PORT || 3000, function () {
    (0, _db2.default)();
});