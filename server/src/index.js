require('dotenv').config({path: __dirname + '../.env'});
import express from 'express';
import { join } from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import routes from './routes';
import cors from 'cors';
import path from 'path';
import AWS from 'aws-sdk';


// import nodemailer from 'nodemailer';
// import Stripe from 'stripe';

AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
AWS.config.region = process.env.AWS_REGION;
const bucketName = process.env.AWS_S3_BUCKET;


const s3 = new AWS.S3();

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

const images = '../../client/images';

app.get('/images', (req, res)=> {
    s3.listBuckets((err, data)=> {
        console.log(data);
        console.log(err);
    })
})





app.listen(process.env.PORT || 3000);

