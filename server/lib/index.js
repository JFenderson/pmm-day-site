'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 3000;

var app = (0, _express2.default)();
var connection = _mysql2.default.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT

});

var CLIENT_PATH = (0, _path.join)(__dirname, '../../client');

app.use(_express2.default.static(CLIENT_PATH));
app.use(_express2.default.json());

app.use(_express2.default.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World');
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