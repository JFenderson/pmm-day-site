

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
               $('.nav').addClass('sticky');
           } else {
               $('.nav').removeClass('sticky'); 
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
// function init_map(){
//     var myOptions = 
//     {
//         zoom:12,center:new google.maps.LatLng(33.480831,-86.90826800000002),
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
//     map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
//     marker = new google.maps.Marker({
//         map: map,position: new google.maps.LatLng(33.480831,-86.90826800000002)
//     });
//     infowindow = new google.maps.InfoWindow({
//         content:'<strong>Miles College</strong><br>5500 Myron Massey Blvd<br>35064 Fairfield<br>'
//     });
//     google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);
//     });
//     infowindow.open(map,marker);
// }
// google.maps.event.addDomListener(window, 'load', init_map);