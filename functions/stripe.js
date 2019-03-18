const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.token);

let charge = (req, res, amount) => {
    let token = req.body.id;
    let email = req.body.email;

    stripe.customers.create({
        source: token,
        email: email,
    }).then(customer => {
        console.log('this is the customer', customer)
        return stripe.charges.create({
            amount: amount,
            currency: 'usd',
            description: 'For PMM Weekend',
            customer: customer.id,
            receipt_email: customer.email,
        }); 
    }).then(charge => {
        return send(res, 200, {
            message: 'Success',
            charge,
        })
    })
    .catch((err) => {
        console.log(err);
        send(res, 500, {
            error: err.message,
        });
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
}

let send = (res, code, body) => {
    res.send({
        statusCode: code,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(body),
    });
}
module.exports = { charge, send }