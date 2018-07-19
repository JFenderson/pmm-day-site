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



app.listen(process.env.PORT || 3000, () => {
    configure();
});

