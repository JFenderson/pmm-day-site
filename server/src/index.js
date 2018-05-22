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

app.post('/charge', (req, res)=> {
    stripePK;

    console.log('this is the req from main index js', req.body);
    console.log('stripe token', req.body.token)
    
    let token = req.body.token.id;
    let email = req.body.token.email;
    let card = req.body.token.card.id;
    
    stripe.customers.create({
      email: email,
      source: token,
    })
    .then(customer => {
        stripe.charges.create({
            amount: 999,
            currency: 'usd',
            description: 'Example charge',
            source: customer.id
        }); 
    })
    .then(charge => res.send(charge))
    .catch(err => {
        console.log("Error:", err);
        res.status(500).send({error: "Purchase Failed"});
      })
    
})

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

// export RDS_HOSTNAME="pmmpicnic.ckrnv82mga0r.us-east-1.rds.amazonaws.com"
// export RDS_USERNAME="JFenderson"
// export RDS_PASSWORD="Tori7784"
// export RDS_PORT="3306"
// export RDS_DB_NAME="pmm_picnic"