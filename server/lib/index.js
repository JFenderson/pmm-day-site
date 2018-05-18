'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _stripe = require('stripe');

var _stripe2 = _interopRequireDefault(_stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stripe = (0, _stripe2.default)('pk_test_H70vmlNTo3eiFAtoKB2AJAoh');
var elements = stripe.elements();

var port = 3000;

var app = (0, _express2.default)();

var connection = _mysql2.default.createConnection({
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
});

var CLIENT_PATH = (0, _path.join)(__dirname, '../../client');
app.use((0, _cors2.default)());
app.use(_express2.default.static(CLIENT_PATH));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use('/api', _routes2.default);
app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(CLIENT_PATH + '/index.html'));
});

app.post('/charge', function (req, res) {
    console.log(req.body);
    res.send('TEST');
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... ");
    } else {
        console.log("Error connecting database ... ");
    }
});

app.listen(port, function (err) {
    if (err) {
        return console.log('something went wrong', err);
    }

    console.log('Server is listening on Port ' + port);
});

// export RDS_HOSTNAME="pmmpicnic.ckrnv82mga0r.us-east-1.rds.amazonaws.com"
// export RDS_USERNAME="JFenderson"
// export RDS_PASSWORD="Tori7784"
// export RDS_PORT="3306"
// export RDS_DB_NAME="pmm_picnic"