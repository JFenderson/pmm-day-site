import { Router } from 'express';
import { charge } from '../utils/stripeCharge'
import stripeLoader from 'stripe';
import mailgun from 'mailgun-js';


let router = Router();
const stripe = stripeLoader('sk_test_YV5UGpBi1SJ0teMkYeG25keW'); // define secret key in ENV_VAR

//PAYMENT FOR GOLD PACKAGE ($20.00)
router.post('/gold', (req, res) => {
    console.log('this is the req from stripePay', req.body);
    console.log('stripe token', req.body.id)

    let token = req.body.id;
    let email = req.body.email;
    let card = req.body.card.id;
    
    stripe.customers.create({
      email: email,
    //   source: card,
    }).then(customer => {
        return stripe.customers.createSource(customer.id, {
            source: 'tok_visa'
        }); 
    }).then((source)=> {
        return stripe.charges.create({
            amount: 2000,
            currency: 'usd',
            description: 'For PMM Weekend',
            receipt_email: 'purplemarchingmachine96@gmail.com',
            customer: source.customer
        });
    }).then((charge) => {
        res.send(charge)
    })
    .catch((err) => {
        console.log("Error:", err);
        res.status(500).send({error: "Purchase Failed"});
      });

      //SENDING MAILGUN REGISTRATION FOR EMAIL UPDATES
    var api_key = "key-e73adf48b4acfc0a35cdc70b431faa0c";
    var domain = "sandboxde3a03b6aac24cd5aee0550866383b54.mailgun.org";
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});   

    var data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: `${email}, YOU@YOUR_DOMAIN_NAME'`,
    subject: 'Hello',
    text: 'Thank you for you Payment..See you at PMM Weekend!'
    };

    mailgun.messages().send(data, function (error, body) {
    console.log(body);
    });
});

// PAYMENT FOR PURPLE PACKAGE($10.00)
router.post('/purple', (req, res) => {
    console.log('this is the req from stripePay', req.body);
    console.log('stripe token', req.body.id)

    let token = req.body.id;
    let email = req.body.email;
    let card = req.body.card.id;
    
    stripe.customers.create({
      email: email,
    //   source: card,
    }).then(customer => {
        return stripe.customers.createSource(customer.id, {
            source: 'tok_visa'
        }); 
    }).then((source)=> {
        return stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            description: 'For PMM Weekend',
            receipt_email: 'purplemarchingmachine96@gmail.com',
            customer: source.customer
        });
    }).then((charge) => {
        res.send(charge)
    })
    .catch((err) => {
        console.log("Error:", err);
        res.status(500).send({error: "Purchase Failed"});
      });
});

//PAYMENT FOR WHITE PACKAGE($7.00)
router.post('/white', (req, res) => {
    console.log('this is the req from stripePay', req.body);
    console.log('stripe token', req.body.id)

    let token = req.body.id;
    let email = req.body.email;
    let card = req.body.card.id;
    
    stripe.customers.create({
      email: email,
    //   source: card,
    }).then(customer => {
        return stripe.customers.createSource(customer.id, {
            source: 'tok_visa'
        }); 
    }).then((source)=> {
        return stripe.charges.create({
            amount: 700,
            currency: 'usd',
            description: 'For PMM Weekend',
            receipt_email: 'purplemarchingmachine96@gmail.com',
            customer: source.customer
        });
    }).then((charge) => {
        res.send(charge)
    })
    .catch((err) => {
        console.log("Error:", err);
        res.status(500).send({error: "Purchase Failed"});
      });
});
export default router;