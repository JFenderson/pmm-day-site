

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

  const stripe = Stripe('pk_test_H70vmlNTo3eiFAtoKB2AJAoh');
  const elements = stripe.elements();


// Create an instance of the card Element.
const card = elements.create('card', {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#8898AA',
      color: 'white',
      lineHeight: '36px',
      fontWeight: 300,
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '19px',

      '::placeholder': {
        color: '#8898AA',
      },
    },
    invalid: {
      iconColor: '#e85746',
      color: '#e85746',
    }
  },
  classes: {
    focus: 'is-focused',
    empty: 'is-empty',
  },
});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// Create a token or display an error when the form is submitted.
const form = document.getElementById('payment-form');
var inputs = document.querySelectorAll('input.field');
Array.prototype.forEach.call(inputs, function(input) {
  input.addEventListener('focus', function() {
    input.classList.add('is-focused');
  });
  input.addEventListener('blur', function() {
    input.classList.remove('is-focused');
  });
  input.addEventListener('keyup', function() {
    if (input.value.length === 0) {
      input.classList.add('is-empty');
    } else {
      input.classList.remove('is-empty');
    }
  });
});
// //handle errors and success
// function setOutcome(result) {
//   var successElement = document.querySelector('.success');
//   var errorElement = document.querySelector('.error');
//   successElement.classList.remove('visible');
//   errorElement.classList.remove('visible');

//   if (result.token) {
//     // Use the token to create a charge or a customer
//     // https://stripe.com/docs/charges
//     successElement.querySelector('.token').textContent = result.token.id;
//     successElement.classList.add('visible');
//   } else if (result.error) {
//     errorElement.textContent = result.error.message;
//     errorElement.classList.add('visible');
//   }
// }
// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// // Handle form submission.
// var form = document.getElementById('payment-form');
// form.addEventListener('submit', function(event) {
//   event.preventDefault();

//   stripe.createToken(card).then(function(result) {
//     if (result.error) {
//       // Inform the user if there was an error.
//       var errorElement = document.getElementById('card-errors');
//       errorElement.textContent = result.error.message;
//     } else {
//       // Send the token to your server.
//       stripeTokenHandler(result.token);
//     }
//   });
// });

card.on('change', function(event) {
  setOutcome(event);
});

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = document.querySelector('form');
  var extraDetails = {
    name: form.querySelector('input[name=cardholder-name]').value,
    address_line1: form.querySelector('input[name=address-street]').value,
    address_city: form.querySelector('input[name=address-city]').value ,
    address_state: form.querySelector('input[name=address-state]').value,
    address_zip: form.querySelector('input[name=address-zip]').value
  };

  stripe.createToken(card,extraDetails).then(function(result) {
    $.ajax({
      url: 'http://localhost:3000/charge',
      method: "POST",
      contentType: 'application/json',
      data: JSON.stringify(card,{
        extraDetails,
        phone_number: form.querySelector('input[name=phone-number').value,
      }),
      success: function(data) {
        console.log(data);
      },
      error: function(err){
      console.log('error handling message',err);
      }
    });

    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.innerText = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});
//   stripe.createToken(card, extraDetails).then(setOutcome);
//   $.ajax({
//     url: 'http://localhost:3000/charge',
//     method: "POST",
//     contentType: 'application/json',
//     data: JSON.stringify(card,{
//       extraDetails,
//       phone_number: form.querySelector('input[name=phone-number').value,
//     }),
//     success: function(data) {
//       console.log(data);
//     },
//     error: function(err){
//     console.log('error handling message',err);
//     }
//   });
// });

  //   $('#formPayment').click( (e) => {
  //   e.preventDefault();
  //   var extraDetails = {
  //     name: $('#cardholder-name').val(),
  //     address_line1: $('#address-street').val(),
  //     address_city: $('#address-city').val() ,
  //     address_state: $('#address-state').val(),
  //     address_zip: $('#address-zip').val()
  //   };
  //   stripe.createToken(card, extraDetails)
  //   .then(setOutcome);
  //   $.ajax({
  //     url: 'http://localhost:3000/api/charge',
  //     method: "POST",
  //     contentType: 'application/json',
      // data: JSON.stringify {
      //   extraDetails,
      //   phone_number: $('#phone-number').val(),
      // },
  //     success: function(data) {
  //       console.log(data);
  //     },
  //     error: function(err){
  //     console.log('error handling message',err);
  //     }
  //   });
  // });
