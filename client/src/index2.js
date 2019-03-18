const STRIPE_PUBLIC_KEY = 'pk_test_obzu76S8L0GFvqkXbKn204a2'; // TODO: PUT YOUR STRIPE PUBLISHABLE KEY HERE
const FIREBASE_FUNCTION = 'https://pmm-site-a57b9.cloudfunctions.net/api/charge/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
const stripe = Stripe(STRIPE_PUBLIC_KEY);

  //MEMBER SIGNUP TO ADD TO BE ADDED TO DATABASE
$('#memberSubmit').click(() => memberSignup());
let memberSignup = async () => {
    e.preventDefault();

    let name = $('#memberName').val();
    let email = $('#memberEmail').val();
    let number = $('#memberNumber').val();
    let location = $('#memberLocation').val();
    let crabYear = $('#memberCrabYear').val();

    await fetch(`https://pmm-site-a57b9.cloudfunctions.net/api/members/signup`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        name: name, email: email, phoneNumber: number, location: location, crabYear: crabYear
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response)
        setTimeout(() => {
          window.location.reload();
        }, 10)
      });
}

let phoneFormatter = () => {
    $('#number').on('input', function () {
      var number = $(this).val().replace(/[^\d]/g, '')
      if (number.length == 7) {
        number = number.replace(/(\d{3})(\d{4})/, "$1-$2");
      } else if (number.length == 10) {
        number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      }
      $(this).val(number)
    });
  };

  $(phoneFormatter);

$('#contactSubmit').click(() => {
    let name = $('#name').val();
    let email = $('#email').val();
    let message = $('#message').val();

    fetch(`https://pmm-site-a57b9.cloudfunctions.net/api/contact`, {
      method: 'POST',
      body: JSON.stringify({
        name: name, email: email, message: message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response)
        setTimeout(() => {
          window.location.reload();
        }, 10)
      });
    });

let checkoutMethod = () => {

    var handler = StripeCheckout.configure({
        key: stripe,
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        zipCode: true,
        billingAddress: true,
        token: async token => {
            // Pass the received token to our Firebase function
            let res = await ticketHandler(token, args);
            if (res.body.error) return console.log(res.body.error);

        }
      });

    $('#ticketBtn').on('click', (e) => {
        e.preventDefault();

        var tixQuanity = $('#numberOfTickets').val();
        var tixType = $('#purchase').val();

        if (tixType == "individual") {
            // Open Checkout with further options:
            handler.open({
            name: 'PMM Picnic',
            description: 'Individual Tickets',
            amount: 1000 * tixQuanity
            });
        }
        else if (tixType == "space") {
            if (tixQuanity == "1" || tixQuanity == "2" || tixQuanity == "3") {
            // Open Checkout with further options:
                handler.open({
                name: 'PMM Picnic',
                description: 'Tent Space',
                amount: 12000 * tixQuanity,
            });
            } else {
                alert('You can only purchase 3 tent spaces per transaction, please contact the committee if more is needed.');
            }
        }
    });

    // Close Checkout on page navigation
    window.addEventListener('popstate', () => handler.close());
    
}

let ticketHandler = async (token, args) => {
    if (tixType == 'individual') {
        if (tixQuanity == 1) {
            let res = await fetch(`https://pmm-site-a57b9.cloudfunctions.net/api/charge/tickets/idv/1`, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripe
            },
            body: JSON.stringify(token, args)
        })
        const data = await res.json();
        data.body = JSON.parse(data.body);
        return data;

        } else if (tixQuanity == 2) {

        let res = await fetch(`https://pmm-site-a57b9.cloudfunctions.net/api/charge/tickets/idv/2`, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripe
            },
            body: JSON.stringify(token, args)
        })
        const data = await res.json();
        data.body = JSON.parse(data.body);
        return data;

        } else if (tixQuanity == 3) {
        let res = await fetch(`https://pmm-site-a57b9.cloudfunctions.net/api/charge/tickets/idv/3`, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripe
            },
            body: JSON.stringify(token, args)
        })
        const data = await res.json();
        data.body = JSON.parse(data.body);
        return data;

        } else if (tixQuanity == 4) {
        let res = await fetch(`https://pmm-site-a57b9.cloudfunctions.net/api/charge/tickets/idv/4`, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripe
            },
            body: JSON.stringify(token, args)
        })
        const data = await res.json();
        data.body = JSON.parse(data.body);
        return data;

        } else if (tixQuanity == 5) {
        let res = await fetch(`https://pmm-site-a57b9.cloudfunctions.net/api/charge/tickets/idv/5`, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripe
            },
            body: JSON.stringify(token, args)
        })
        const data = await res.json();
        data.body = JSON.parse(data.body);
        return data;

        }
    } else {
        if (tixQuanity == 1) {
        let res = await fetch(`https://pmm-site-a57b9.cloudfunctions.net/api/charge/tickets/tntsp/1`, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripe
            },
            body: JSON.stringify(token, args)
        })
        const data = await res.json();
        data.body = JSON.parse(data.body);
        return data;

        } else if (tixQuanity == 2) {
        let res = await fetch(`https://pmm-site-a57b9.cloudfunctions.net/api/charge/tickets/tntsp/2`, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripe
            },
            body: JSON.stringify(token, args)
        })
        const data = await res.json();
        data.body = JSON.parse(data.body);
        return data;

        } else if (tixQuanity == 3) {
        let res = await fetch(`https://pmm-site-a57b9.cloudfunctions.net/api/charge/tickets/tntsp/3`, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripe
            },
            body: JSON.stringify(token, args)
        })
        const data = await res.json();
        data.body = JSON.parse(data.body);
        return data;

        }
    }
}


checkoutMethod();



