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
app.use((0, _cors2.default)());
app.use(_express2.default.static(CLIENT_PATH));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });


app.use('/api', _routes2.default);
app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(CLIENT_PATH + '/index.html'));
});

app.post('/', function (req, res, next) {
    // res.sendFile(CLIENT_PATH + '/index.html');
    var transporter = _nodemailer2.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: 'joseph.fenderson@gmail.com',
            clientId: '15915734946-cuije3mk1f0h6bh390rb31fdhos0gjpa.apps.googleusercontent.com',
            clientSecret: 'fJxFiZJLgqsAqtIfQU6w1xbG',
            refreshToken: '1/eVMu8IMRe-tW7e7Z_itySgfclv2TJlMWDPHa4Lja5es'
        }
    });

    var name = req.body.name;
    var email = req.body.email;
    var number = req.body.number;
    var message = req.body.message;
    var mailOption = {
        from: name + ' <' + email + '>',
        to: '' + email,
        subject: 'New Message from ' + email + ' at pmm_day-site',
        text: message,
        html: '<p>' + message + ', Sender\'s Number is ' + number + '</p>'
    };

    transporter.sendMail(mailOption, function (error, res) {
        // console.log(info)
        if (error) {
            console.log('this is the error', error);
            console.log('these are the req.body.name: ' + name);
            console.log('req.body.email:  ' + email);
            console.log('req.body.number:  ' + number);
            console.log('req.body.message:  ' + message);
        } else {
            res.sendStatus(201);
        }
        transporter.close();
    });
    next();
    console.log(req.body);
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