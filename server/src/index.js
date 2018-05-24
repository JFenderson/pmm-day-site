import express from 'express';
import { join } from 'path';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import path from 'path';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';

const stripePK = Stripe('pk_test_H70vmlNTo3eiFAtoKB2AJAoh');
const stripe = Stripe('sk_test_YV5UGpBi1SJ0teMkYeG25keW'); 

const port = 3000;

let app = express();

var connection = mysql.createConnection({
    database : process.env.RDS_DB_NAME,
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT
});


const CLIENT_PATH = join(__dirname, '../../client');
app.use(cors());
app.use(express.static(CLIENT_PATH));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', routes);
app.get('/', function(req, res){
    res.sendFile(path.join(CLIENT_PATH + '/index.html')); 
  });


connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... ");    
    } else {
        console.log("Error connecting database ... ");    
    }
});

app.listen(port,(err)=> {
    if(err){
        return console.log('something went wrong',err);
    }

    console.log(`Server is listening on Port ${port}`);
});

// export STRIPE_SK
// export STRIPE_PK
// export GMAIL_CLIENT_ID
// export GMAIL_CLIENT_SECRET
// export GMAIL_REFRESH_TOKEN
// export AWS_ACCESS_KEY
// export AWS_SECRET_ACCESS_KEY
// export AWS_REGION
// export AWS_S3_BUCKET
// export RDS_DB_NAME
// export AWS_RDS_USERNAME
// export AWS_RDS_HOSTNAME
// export AWS_RDS_PASSWORD
// export AWS_RDS_PORT
// export MAILGUN_PK
// export MAILGUN_SK
// export MAILGUN_DOMAIN