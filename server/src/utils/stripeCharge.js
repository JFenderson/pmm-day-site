import stripeLoader from 'stripe';

const stripe = stripeLoader('sk_test_YV5UGpBi1SJ0teMkYeG25keW'); // define secret key in ENV_VAR


function charge(token, amt, email) {
    // returning a promise, so when we call .charge, we can use .then(...)
    return stripe.charge.create({
        amount: amt * 2000, //amount in cents
        currency: 'usd',
        source: token,
        description: 'PMM Weekend',
        receipt_email: email
    });
};

function customer(token){
    return stripe.customer.create({})
}



export { charge };