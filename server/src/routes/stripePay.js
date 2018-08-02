import { Router } from 'express';
import stripeLoader from 'stripe';
import nodemailer from 'nodemailer';
import { transporter, sendInBlueTransporter, mailgunTransporter } from '../config/nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let router = Router();
const stripe = stripeLoader(process.env.STRIPE_SK); 

//PAYMENT FOR GOLD PACKAGE ($20.00)
router.post('/gold', (req, res) => {
    let token = req.body.id;
    let email = req.body.email;
    
    stripe.customers.create({
        source: token,
        email: email,
    }).then(customer => {
        console.log('this is the customer', customer)
        stripe.charges.create({
            amount: 2000,
            currency: 'usd',
            description: 'For PMM Weekend',
            customer: customer.id,
            receipt_email: customer.email,
        }); 
    }).then((charge) => {
        res.send(charge)
    })
    .catch(function onError(error) {
        if (error.status === 400) {
          console.log('Bad request, often due to missing a required parameter.');
        } else if (error.status === 401) {
          console.log('No valid API key provided.');
        } else if (error.status === 404) {
          console.log('The requested resource doesn\'t exist.');
        } else if(error.status === 500){
            console.log('Purchase Failed')
        }
      });

      //SENDING email

    var mailOption = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: `${email}, YOU@YOUR_DOMAIN_NAME'`,
    subject: 'Hello',
    text: 'Thank you for you Payment..See you at PMM Weekend!'
    };

    transporter.sendMail(mailOption,(error, res)=> {
        if (error) {
            console.log(error);
        } else {
            console.log('email sent!')
            res.sendStatus(201);
        }
        transporter.close();
    });

});

// PAYMENT FOR PURPLE PACKAGE($10.00)
router.post('/purple', (req, res) => {

    let token = req.body.id;
    let email = req.body.email;
    
    stripe.customers.create({
        email: email,
        source: token,
    }).then(customer => {
        console.log('this is the customer', customer)
        stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            description: 'For PMM Weekend',
            customer: customer.id,
            receipt_email: customer.email,
        }); 
    }).then((charge) => {
        res.send(charge)
    })
    .catch(function onError(error) {
        if (error.status === 400) {
          console.log('Bad request, often due to missing a required parameter.');
        } else if (error.status === 401) {
          console.log('No valid API key provided.');
        } else if (error.status === 404) {
          console.log('The requested resource doesn\'t exist.');
        } else if(error.status === 500){
            console.log('Purchase Failed')
        }
      });
});

// //PAYMENT FOR WHITE PACKAGE($7.00)
router.post('/white', (req, res) => {

    let token = req.body.id;
    let email = req.body.email;
    
    stripe.customers.create({
      email: email,
      source: token
    }).then(customer => {
        console.log('this is the customer', customer)
        stripe.charges.create({
            amount: 700,
            currency: 'usd',
            description: 'For PMM Weekend',
            customer: customer.id,
            receipt_email: customer.email,
        }); 
    }).then((charge) => {
        res.send(charge)
    })
    .catch(function onError(error) {
        if (error.status === 400) {
          console.log('Bad request, often due to missing a required parameter.');
        } else if (error.status === 401) {
          console.log('No valid API key provided.');
        } else if (error.status === 404) {
          console.log('The requested resource doesn\'t exist.');
        } else if(error.status === 500){
            console.log('Purchase Failed')
        }
      });
});
export default router;