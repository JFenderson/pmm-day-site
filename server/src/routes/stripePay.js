import { Router } from 'express';
import { charge } from '../utils/stripeCharge'
import stripeLoader from 'stripe';


let router = Router();
const stripe = stripeLoader('sk_test_YV5UGpBi1SJ0teMkYeG25keW'); // define secret key in ENV_VAR

router.post('/', (req, res) => {
    console.log('this is the req from stripePay', req.body);

    let token = req.body.stripeToken;
    let email = req.body.stripeEmail;

    const charge = stripe.charges.create({
        amount: 999,
        currency: 'usd',
        description: 'Example charge',
        source: token,
        receipt_email: 'purplemarchingmachine96@gmail.com',
      });

      if((sucess) => {
          res.status(200).json({message: 'success'});
      });else{
          res.sendStatus(500)
      }

    // charge(token, email)
    //     .then((success) => {
    //         res.status(200).json({ message: 'success'});
    //     })
    //     .catch((err) => {
    //         res.sendStatus(500);
    //     });
});

export default router;