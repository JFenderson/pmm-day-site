

$(function(){
    console.log('ready!');
    			// grab the initial top offset of the navigation 
          var stickyNavTop = $('.nav').offset().top;
		   	
          // our function that decides weather the navigation bar should have "fixed" css position or not.
          var stickyNav = function(){
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
       $(window).scroll(function() {
         stickyNav();
       });
})
// COUNTDOWN 
/* --------------------------
 * GLOBAL VARS
 * -------------------------- */
// The date you want to count down to
var dateStr = "13/05/2019 08:18";
var date = dateStr.split(/\s|\/|:/);
var targetDate = new Date(date[2], date[1], date[0], date[3], date[4]);
// var targetDate = new Date("2018/4/16");   

// Other date related variables
var days;
var hrs;
var min;
var sec;

/* --------------------------
 * ON DOCUMENT LOAD
 * -------------------------- */
$(function() {
   // Calculate time until launch date
   timeToLaunch();
  // Transition the current countdown from 0 
  numberTransition('#days .number', days, 1000, 'easeOutQuad');
  numberTransition('#hours .number', hrs, 1000, 'easeOutQuad');
  numberTransition('#minutes .number', min, 1000, 'easeOutQuad');
  numberTransition('#seconds .number', sec, 1000, 'easeOutQuad');
  // Begin Countdown
  setTimeout(countDownTimer,1001);
});

/* --------------------------
 * FIGURE OUT THE AMOUNT OF 
   TIME LEFT BEFORE LAUNCH
 * -------------------------- */
function timeToLaunch(){
    // Get the current date
    var currentDate = new Date();

    // Find the difference between dates
    var diff = (currentDate - targetDate)/1000;
    var diff = Math.abs(Math.floor(diff));  

    // Check number of days until target
    days = Math.floor(diff/(24*60*60));
    sec = diff - days * 24*60*60;

    // Check number of hours until target
    hrs = Math.floor(sec/(60*60));
    sec = sec - hrs * 60*60;

    // Check number of minutes until target
    min = Math.floor(sec/(60));
    sec = sec - min * 60;
}

/* --------------------------
 * DISPLAY THE CURRENT 
   COUNT TO LAUNCH
 * -------------------------- */
function countDownTimer(){ 
    
    // Figure out the time to launch
    timeToLaunch();
    
    // Write to countdown component
    $( "#days .number" ).text(days);
    $( "#hours .number" ).text(hrs);
    $( "#minutes .number" ).text(min);
    $( "#seconds .number" ).text(sec);
    
    // Repeat the check every second
    setTimeout(countDownTimer,1000);
}

/* --------------------------
 * TRANSITION NUMBERS FROM 0
   TO CURRENT TIME UNTIL LAUNCH
 * -------------------------- */
function numberTransition(id, endPoint, transitionDuration, transitionEase){
  // Transition numbers from 0 to the final number
  $({numberCount: $(id).text()}).animate({numberCount: endPoint}, {
      duration: transitionDuration,
      easing:transitionEase,
      step: function() {
        $(id).text(Math.floor(this.numberCount));
      },
      complete: function() {
        $(id).text(this.numberCount);
      }
   }); 
};

// END COUNTDOWN



//slideshow
// var myIndex = 0;
// carousel();

// function carousel() {
//     var i;
//     var x = document.getElementsByClassName("photo-gallery");
//     for (i = 0; i < x.length; i++) {
//        x[i].style.display = "none";  
//     }
//     myIndex++;
//     if (myIndex > x.length) {myIndex = 1}    
//     x[myIndex-1].style.display = "block";  
//     setTimeout(carousel, 2000); // Change image every 2 seconds
// }

// var slides = document.querySelectorAll('#slides .slide');
// var currentSlide = 0;
// var slideInterval = setInterval(nextSlide,2000);

// function nextSlide() {
//     slides[currentSlide].className = 'slide';
//     currentSlide = (currentSlide+1)%slides.length;
//     slides[currentSlide].className = 'slide showing';
// }


$("nav").find("a").click(function(e) {
  e.preventDefault();
  var section = $(this).attr("href");
  $("html, body").animate({
      scrollTop: $(section).offset().top
  });
});

//nodemailer

$('#contactSubmit').click(()=>{
  console.log('button clicked..now you can send');
});


$('#contactSubmit').click( () => {
  let name = $('#name').val();
  let email = $('#email').val();
  let number = $('#number').val();
  let message = $('#message').val();
  $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/contact',
      contentType: 'application/json',
      data: JSON.stringify({
        name:name, email:email, number:number, message:message
      }),
      // data: $('#contactForm').serialize(),
      success: function(data) {
                 console.log(data);
               },
      error: function(err){
        console.log('error handling message',err);
      }
  });
});

//stripe payment



// functions for stripe
// function addStripeInformation(data) {
//   var handler = StripeCheckout.configure({
//     key: 'KEY_EDITED_OUT',
//     token: function(token) {
//       $.ajax({
//         url: 'http://localhost:3000/api/charge',
//         method: "POST",
//         data: {
//           "token" : token.id,
//           "email" : data.email
//         }
//       });
//     }
//   });

  // Open Checkout with further options
  // handler.open({
    //   email: data.email,
    //   name: data.name,
    //   description: 'Adding payment information',
    //   zipCode: false,
    //   panelLabel: "Add Information"
    // });
    
    
    
    // Close Checkout on page navigation
  //   $(window).on('popstate', function() {
  //     handler.close();
  //   }); 
  // }
  
  $('#customButton').click( (e) => {
    console.log('button click to start stripe');
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/charge',
      contentType: 'application/json',
      // data: JSON.stringify({
      //   name:name, email:email, number:number, message:message
      // }),
      // data: $('#contactForm').serialize(),
      success: function(data) {
                 console.log(data);
               },
      error: function(err){
        console.log('error handling message',err);
      }
    }); 
  })

  const stripe = Stripe('pk_test_H70vmlNTo3eiFAtoKB2AJAoh');
  const elements = stripe.elements();
  // var card = elements.create('card');

  // Custom styling can be passed to options when creating an Element.
const style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#32325d",
  },
};

// Create an instance of the card Element.
const card = elements.create('card', {style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

card.addEventListener('change', ({error}) => {
  const displayError = document.getElementById('card-errors');
  if (error) {
    displayError.textContent = error.message;
  } else {
    displayError.textContent = '';
  }
});

// Create a token or display an error when the form is submitted.
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {token, error} = await stripe.createToken(card);

  if (error) {
    // Inform the customer that there was an error.
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = error.message;
  } else {
    // Send the token to your server.
    stripeTokenHandler(token);
  }
});

const stripeTokenHandler = (token) => {
  // Insert the token ID into the form so it gets submitted to the server
  const form = document.getElementById('payment-form');
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}


  // var handler = StripeCheckout.configure({
  //   key: 'pk_test_H70vmlNTo3eiFAtoKB2AJAoh',
  //   image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  //   locale: 'auto',
  //   token: function(token) {
  //     // You can access the token ID with `token.id`.
  //     // Get the token ID to your server-side code for use.
  //     $.ajax({
  //       url: 'http://localhost:3000/charge',
  //       method: "POST",
  //       contentType: 'application/json',
  //       data: {
  //         stripeToken : token.id,
  //         email: token.email,
  //         token:token
  //       }
  //     });
  //   }
  // });
  
  // document.getElementById('customButton').addEventListener('click', function(e) {
  //   // Open Checkout with further options:
  //   handler.open({
  //     name: 'PMM Picnic',
  //     description: '2 widgets',
  //     amount: 2000
  //   });
  //   e.preventDefault();
  // });
  
  // // Close Checkout on page navigation:
  // window.addEventListener('popstate', function() {
  //   handler.close();
  // });
