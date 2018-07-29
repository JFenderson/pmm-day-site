'use strict';
require('dotenv').config()

import express from 'express';
import { join } from 'path';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import path from 'path';
import AWS from 'aws-sdk';
import configure from './config/db';
import sgMail from '@sendgrid/mail';


const port = 3000;

let app = express();



const CLIENT_PATH = join(__dirname, '../../client');
app.use(cors());
app.use(express.static(CLIENT_PATH));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.render(path.join(CLIENT_PATH + '/index.html'), {
        stripePublishableKey: process.env.STRIPE_PK
    }); 
  });

  console.log(process.env)

//   # ------------------
//   # Create a campaign\
//   # ------------------
  
//   # Include the SendinBlue library\
  var SibApiV3Sdk = require('sib-api-v3-sdk');
  var defaultClient = SibApiV3Sdk.ApiClient.instance;
  
//   # Instantiate the client\
  var apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
  
  var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
  var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();
  
//   # Define the campaign settings\
  emailCampaigns = {
      name: 'Campaign sent via the API',
      subject: 'My subject',
      sender: {name: 'From name', email: 'fenderson.joseph@gmail.com'},
      type: 'classic',
  
    //   # Content that will be sent\
      htmlContent: 'Congratulations! You successfully sent this example campaign via the SendinBlue API.',
  
    //   # Select the recipients\
      recipients: {listIds: [5]},
  
    //   # Schedule the sending in one hour\
      scheduledAt: '2018-07-28 00:00:01'
  }
  
//   # Make the call to the client\
  apiInstance.createEmailCampaign(emailCampaigns).then(function(data) {
    console.log('API called successfully. Returned data: ' + data);
  }, function(error) {
    console.error(error);
  });


app.listen(process.env.PORT || 3000, () => {
    configure();
});

