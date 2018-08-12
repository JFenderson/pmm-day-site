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


//   # ------------------
//   # Create a campaign\
//   # ------------------

//   # Include the SendinBlue library\
// var SibApiV3Sdk = require('sib-api-v3-sdk');
//   var defaultClient = SibApiV3Sdk.ApiClient.instance;

// //   # Instantiate the client\
//   var apiKey = defaultClient.authentications['api-key'];
//   apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

//   var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
//   var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

//   # Define the campaign settings\
// emailCampaigns = {
//     name: 'Campaign sent via the API',
//     subject: 'My subject',
//     sender: {name: 'From name', email: 'fenderson.joseph@gmail.com'},
//     type: 'classic',

//   //   # Content that will be sent\
//     htmlContent: 'Congratulations! You successfully sent this example campaign via the SendinBlue API.',

//   //   # Select the recipients\
//     recipients: {listIds: [5]}, 

//   //   # Schedule the sending in one hour\
//     scheduledAt: '2018-07-28 00:00:01'
// }

//   # Make the call to the client\
// apiInstance.createEmailCampaign(emailCampaigns).then(function(data) {
//   console.log('API called successfully. Returned data: ' + data);
// }, function(error) {
//   console.error(error);
// });


app.listen(process.env.PORT || 3000, function () {
  (0, _db2.default)();
});