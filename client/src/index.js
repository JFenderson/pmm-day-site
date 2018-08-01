$(document).ready(function(){

  // START NAVBAR
  // grab the initial top offset of the navigation 
  var stickyNavTop = $('.nav').offset().top;

  // our function that decides weather the navigation bar should have "fixed" css position or not.
  var stickyNav = function () {
    var scrollTop = $(window).scrollTop(); // our current vertical position from the top

    // if we've scrolled more than the navigation, change its position to fixed to stick to top,
    // otherwise change it back to relative
    if (scrollTop > stickyNavTop) {
      $('.hero-nav').addClass('sticky');
    } else {
      $('.hero-nav').removeClass('sticky');
    }
  };

  stickyNav();
  // and run it again every time you scroll
  $(window).scroll(function () {
    stickyNav();
  });
  //END NAVBAR
  //AUTOCOMPLETE ZIP CODE INPUT USING ZIPCODEAPI.COM
  


//NODEMAILER FOR CONTACT FORM
// Used to format phone number
function phoneFormatter() {
  $('#number').on('input', function() {
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
  let number = $('#number').val();
  let message = $('#message').val();

  fetch('http://localhost:3000/api/contact', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({
      name: name, email: email, number: number, message: message
    }),
    headers:{
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


  // $.ajax({
  //   method: 'POST',
  //   url: 'http://localhost:3000/api/contact',
  //   contentType: 'application/json',
  //   data: JSON.stringify({
  //     name: name, email: email, number: number, message: message
  //   }),
  //   // data: $('#contactForm').serialize(),
  //   success: function (data) {
  //     console.log(data);
  //   },
  //   error: function (err) {
  //     console.log('error handling message', err);
  //   }
  // });
});
//END NODEMAILER

//MEMBER SIGNUP TO ADD TO BE ADDED TO DATABASE
$('#memberSubmit').click((e) => {
  e.preventDefault();

  let name = $('#memberName').val();
  let email = $('#memberEmail').val();
  let number = $('#memberNumber').val();
  let location = $('#memberLocation').val();
  let crabYear = $('#memberCrabYear').val();

  fetch('http://localhost:3000/api/signup', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({
      name: name, email: email, phoneNumber: number, location: location, crabYear: crabYear
    }),
    headers:{
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

  // $.ajax({
  //   url: 'http://localhost:3000/api/signup',
  //   method: 'POST',
  //   contentType: 'application/json',
  //   data: JSON.stringify({
  //     name: name, email: email, phoneNumber: number, location: location, crabYear: crabYear
  //   }),
  //   success: (data) => {
  //     console.log(data);
  //     setTimeout(() => {
  //       //  window.location.reload(); 
  //       }, 10)
  //   },
  //   error: function (err) {
  //     console.log('error handling message', err);
  //   },
  //   dataType: 'json'
  // });
});
//END MEMBER SIGNUP

//START STRIPE PAYMENT

const stripePK = 'pk_test_obzu76S8L0GFvqkXbKn204a2';



var handlerGold = StripeCheckout.configure({
  key: stripePK,
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  zipCode: true,
  billingAddress: true,
  token: function (token, args) {
    console.log('this is tokens',token)
    console.log('this is args',args)
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    fetch('http://localhost:3000/api/charge/gold', {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' +  stripePK
      },
      body: JSON.stringify(token, args)
    })
      .then(output => {
        console.log(output)
        if (output.status === "succeeded")
          document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
      })
      .catch((error) => {
        if (error.status === 400) {
          console.log('Bad request, often due to missing a required parameter.',error);
        } else if (error.status === 401) {
          console.log('No valid API key provided.', error);
        } else if (error.status === 404) {
          console.log('The requested resource doesn\'t exist.', error);
        } else if(error.status === 500){
            console.log('Purchase Failed', error)
        }
      })

  }
});

var handlerPurple = StripeCheckout.configure({
  key: stripePK,
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  zipCode: true,
  billingAddress: true,
  token: function (token, args) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    fetch('http://localhost:3000/api/charge/purple', {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' +  stripePK
     },
      body: JSON.stringify(token, args)
    })
      .then(output => {
        if (output.status === "succeeded")
          document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
      })
      .catch((error) => {
        if (error.status === 400) {
          console.log('Bad request, often due to missing a required parameter.',error);
        } else if (error.status === 401) {
          console.log('No valid API key provided.', error);
        } else if (error.status === 404) {
          console.log('The requested resource doesn\'t exist.', error);
        } else if(error.status === 500){
            console.log('Purchase Failed', error)
        }
      })

  },
  opened: function() {
  	console.log("Form opened");
  },
closed: function() {
    console.log("Form closed");
  } 
});

var handlerWhite = StripeCheckout.configure({
  key: stripePK,
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  closed: function() {
    if (!token_triggered) {
        // close button click behavior goes here
        console.log("closed")
    } else {
        // payment completion behavior goes here
        console.log("passed")
    }
},
  locale: 'auto',
  zipCode: true,
  billingAddress: true,
  token: function (token, args) {
    token_triggered = true;
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    fetch('http://localhost:3000/api/charge/white', {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' +  stripePK
     },
      body: JSON.stringify(token, args)
    })
      .then(output => {
        if (output.status === "succeeded")
          document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
      })
      .catch((error) => {
        if (error.status === 400) {
          console.log('Bad request, often due to missing a required parameter.',error);
        } else if (error.status === 401) {
          console.log('No valid API key provided.', error);
        } else if (error.status === 404) {
          console.log('The requested resource doesn\'t exist.', error);
        } else if(error.status === 500){
            console.log('Purchase Failed', error)
        }
      })

  }
});

// $('#goldButton').on('click', function(e) {
//   openCheckout("Gold Package", 2000);
//   e.preventDefault();
// });
// $('#purpleButton').on('click', function(e) {
//   openCheckout("Purple Package", 1000);
//   e.preventDefault();
// });
// $('#whiteButton').on('click', function(e) {
//   openCheckout("White Package", 700);
//   e.preventDefault();
// });

// function openCheckout(description, amount)
// {
//   handler.open({
//     name: 'PMM Weekend',
//     description: description,
//     amount: amount,
//     opened: function () {

//     },
//     closed: function () {
//         if (!handler.isTokenGenerate) {

//         }
//     },
//   });
// }

//GOLD PACKAGE BUTTON
document.getElementById('goldButton').addEventListener('click', function (e) {
  // Open Checkout with further options:
  handlerGold.open({
    name: 'PMM Picnic',
    description: 'Gold Package',
    amount: 2000,
  });
  e.preventDefault();
});

//PURPLE PACKAGE BUTTON
document.getElementById('purpleButton').addEventListener('click', function (e) {
  // Open Checkout with further options:
  handlerPurple.open({
    name: 'PMM Picnic',
    description: 'Purple Package',
    amount: 1000,
  });
  e.preventDefault();
});

//WHITE PACKAGE BUTTON
document.getElementById('whiteButton').addEventListener('click', function (e) {
  // Open Checkout with further options:
  handlerWhite.open({
    name: 'PMM Picnic',
    description: 'White Package(Student & Staff Only)',
    amount: 700,
  });
  e.preventDefault();
});


// Close Checkout on page navigation:
window.addEventListener('popstate', function () {
  handlerGold.close();
});
window.addEventListener('popstate', function () {
  handlerPurple.close();
});
window.addEventListener('popstate', function () {
  handlerWhite.close();
});

//END STRIPE

//START IMAGE GALLERY
var photoGallery = function($photoGalleryElement) {
  var $photoGallery = $photoGalleryElement,
      $photoLinks = $photoGallery.find('a[href*="#photo"]'),
      $photos = $photoGallery.find('img[id*="photo"]'),
      activeClass = 'active';
  
  function init() {
    $photoGallery.addClass('enabled');
       
    $photoGallery.on({
      click: function(e) {
        e.preventDefault();
        var $photoTarget = $(this).attr('href');
        $photos.removeClass(activeClass);
        $photoGallery.find($photoTarget).addClass(activeClass);
      }
    }, 'a[href*="#photo"]')
  }
  
  init();
}

$.each($('.photo-gallery'), function() {
  // Try commenting out this line below to see no-js functionality!
  var gallery = new photoGallery( $(this) );
});















// COUNTDOWN 

// The date you want to count down to
var dateStr = "5/04/2019 08:18";
var date = dateStr.split(/\s|\/|:/);
// var targetDate = new Date(date[2], date[1], date[0], date[3], date[4]);
var targetDate = new Date("2019/4/5");   

// Other date related variables
var days;
var hrs;
var min;
var sec;

/* --------------------------
 * ON DOCUMENT LOAD
 * -------------------------- */
$(function () {
  // Calculate time until launch date
  timeToLaunch();
  // Transition the current countdown from 0 
  numberTransition('#days .number', days, 1000, 'easeOutQuad');
  numberTransition('#hours .number', hrs, 1000, 'easeOutQuad');
  numberTransition('#minutes .number', min, 1000, 'easeOutQuad');
  numberTransition('#seconds .number', sec, 1000, 'easeOutQuad');
  // Begin Countdown
  setTimeout(countDownTimer, 1001);
});

/* --------------------------
 * FIGURE OUT THE AMOUNT OF 
   TIME LEFT BEFORE LAUNCH
 * -------------------------- */
function timeToLaunch() {
  // Get the current date
  var currentDate = new Date();

  // Find the difference between dates
  var diff = (currentDate - targetDate) / 1000;
  var diff = Math.abs(Math.floor(diff));

  // Check number of days until target
  days = Math.floor(diff / (24 * 60 * 60));
  sec = diff - days * 24 * 60 * 60;

  // Check number of hours until target
  hrs = Math.floor(sec / (60 * 60));
  sec = sec - hrs * 60 * 60;

  // Check number of minutes until target
  min = Math.floor(sec / (60));
  sec = sec - min * 60;
}

/* --------------------------
 * DISPLAY THE CURRENT 
   COUNT TO LAUNCH
 * -------------------------- */
function countDownTimer() {

  // Figure out the time to launch
  timeToLaunch();

  // Write to countdown component
  $("#days .number").text(days);
  $("#hours .number").text(hrs);
  $("#minutes .number").text(min);
  $("#seconds .number").text(sec);

  // Repeat the check every second
  setTimeout(countDownTimer, 1000);
}

/* --------------------------
 * TRANSITION NUMBERS FROM 0
   TO CURRENT TIME UNTIL LAUNCH
 * -------------------------- */
function numberTransition(id, endPoint, transitionDuration, transitionEase) {
  // Transition numbers from 0 to the final number
  $({ numberCount: $(id).text() }).animate({ numberCount: endPoint }, {
    duration: transitionDuration,
    easing: transitionEase,
    step: function () {
      $(id).text(Math.floor(this.numberCount));
    },
    complete: function () {
      $(id).text(this.numberCount);
    }
  });
};

// END COUNTDOWN
});
// $("nav").find("a").click(function (e) {
//   e.preventDefault();
//   var section = $(this).attr("href");
//   $("html, body").animate({
//     scrollTop: $(section).offset().top
//   });
// });



