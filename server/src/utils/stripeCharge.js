import stripeLoader from 'stripe';

const stripe = stripeLoader(process.env.STRIPE_SK); // define secret key in ENV_VAR


function charge(token, email) {
    // returning a promise, so when we call .charge, we can use .then(...)
    return stripe.charge.create({
        amount: 2000, //amount in cents
        currency: 'usd',
        source: token,
        description: 'PMM Weekend',
        receipt_email: email
    });
};





export { charge };