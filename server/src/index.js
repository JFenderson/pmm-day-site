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
import db from './config/googleDb';
import * as Storage from '@google-cloud/storage';

const port = 3000;
const CLIENT_PATH = join(__dirname, '../../client');
let app = express();

app.use(cors());
app.use(express.static(CLIENT_PATH));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (_, res) => { 
  res.sendFile(path.join(__dirname, 'index.html')) 
});
app.use('/api', routes); 

app.listen(process.env.PORT || 3000, (err) => {
  if(err){
    console.log(err)
  }else{
    console.log(`server listening`)
    configure();
  }
});


