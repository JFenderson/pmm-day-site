

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

// $('#contact-submit').click( () => {
//   $.post('http://localhost:3000/api/contact', $('#contact-form').serialize(), (data) => {
//       console.log('this is the form data:', data);
//      } // I expect a JSON response
//   );
// });


// const getData = (e) => {
//   e.preventDefault();
//   let name = document.getElementById('name').value;
//   let email = document.getElementById('email').value;
//   let number = document.getElementById('number').value;
//   let message = document.getElementById('message').value;

//   fetch('/api/contact', {
//     method: 'POST',
//     headers: new Headers({
//       'Content-Type': 'application/json',

//     }),
//     mode: 'cors',
//     body:JSON.stringify({name:name, email:email, number:number, message:message})
// })
// .then((res)=> {
//   return res.json();
// })
// .then((data)=> {
//   console.log('this is the data', data);
// })
// .catch((err)=>{
//   console.log(err);
// });
// };

// document.getElementById('contactForm').addEventListener('submit',getData);


$('#contactSubmit').click( () => {
  let name = $('#name').val();
  let email = $('#email').val();
  let number = $('#number').val();
  let message = $('#message').val();
  $.ajax({
      type: 'POST',
      url: 'http://localhost/api/contact',
      contentType: 'application/json',
      dataType: 'json',
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

