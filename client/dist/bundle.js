/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/index.js":
/*!*****************************!*\
  !*** ./client/src/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\n$(function () {\n  console.log('ready!');\n  // grab the initial top offset of the navigation \n  var stickyNavTop = $('.nav').offset().top;\n\n  // our function that decides weather the navigation bar should have \"fixed\" css position or not.\n  var stickyNav = function stickyNav() {\n    var scrollTop = $(window).scrollTop(); // our current vertical position from the top\n\n    // if we've scrolled more than the navigation, change its position to fixed to stick to top,\n    // otherwise change it back to relative\n    if (scrollTop > stickyNavTop) {\n      $('.hero-nav').addClass('sticky');\n    } else {\n      $('.hero-nav').removeClass('sticky');\n    }\n  };\n\n  stickyNav();\n  // and run it again every time you scroll\n  $(window).scroll(function () {\n    stickyNav();\n  });\n});\n// COUNTDOWN \n/* --------------------------\n * GLOBAL VARS\n * -------------------------- */\n// The date you want to count down to\nvar dateStr = \"13/05/2019 08:18\";\nvar date = dateStr.split(/\\s|\\/|:/);\nvar targetDate = new Date(date[2], date[1], date[0], date[3], date[4]);\n// var targetDate = new Date(\"2018/4/16\");   \n\n// Other date related variables\nvar days;\nvar hrs;\nvar min;\nvar sec;\n\n/* --------------------------\n * ON DOCUMENT LOAD\n * -------------------------- */\n$(function () {\n  // Calculate time until launch date\n  timeToLaunch();\n  // Transition the current countdown from 0 \n  numberTransition('#days .number', days, 1000, 'easeOutQuad');\n  numberTransition('#hours .number', hrs, 1000, 'easeOutQuad');\n  numberTransition('#minutes .number', min, 1000, 'easeOutQuad');\n  numberTransition('#seconds .number', sec, 1000, 'easeOutQuad');\n  // Begin Countdown\n  setTimeout(countDownTimer, 1001);\n});\n\n/* --------------------------\n * FIGURE OUT THE AMOUNT OF \n   TIME LEFT BEFORE LAUNCH\n * -------------------------- */\nfunction timeToLaunch() {\n  // Get the current date\n  var currentDate = new Date();\n\n  // Find the difference between dates\n  var diff = (currentDate - targetDate) / 1000;\n  var diff = Math.abs(Math.floor(diff));\n\n  // Check number of days until target\n  days = Math.floor(diff / (24 * 60 * 60));\n  sec = diff - days * 24 * 60 * 60;\n\n  // Check number of hours until target\n  hrs = Math.floor(sec / (60 * 60));\n  sec = sec - hrs * 60 * 60;\n\n  // Check number of minutes until target\n  min = Math.floor(sec / 60);\n  sec = sec - min * 60;\n}\n\n/* --------------------------\n * DISPLAY THE CURRENT \n   COUNT TO LAUNCH\n * -------------------------- */\nfunction countDownTimer() {\n\n  // Figure out the time to launch\n  timeToLaunch();\n\n  // Write to countdown component\n  $(\"#days .number\").text(days);\n  $(\"#hours .number\").text(hrs);\n  $(\"#minutes .number\").text(min);\n  $(\"#seconds .number\").text(sec);\n\n  // Repeat the check every second\n  setTimeout(countDownTimer, 1000);\n}\n\n/* --------------------------\n * TRANSITION NUMBERS FROM 0\n   TO CURRENT TIME UNTIL LAUNCH\n * -------------------------- */\nfunction numberTransition(id, endPoint, transitionDuration, transitionEase) {\n  // Transition numbers from 0 to the final number\n  $({ numberCount: $(id).text() }).animate({ numberCount: endPoint }, {\n    duration: transitionDuration,\n    easing: transitionEase,\n    step: function step() {\n      $(id).text(Math.floor(this.numberCount));\n    },\n    complete: function complete() {\n      $(id).text(this.numberCount);\n    }\n  });\n};\n\n// END COUNTDOWN\n\n\n//slideshow\n// var myIndex = 0;\n// carousel();\n\n// function carousel() {\n//     var i;\n//     var x = document.getElementsByClassName(\"photo-gallery\");\n//     for (i = 0; i < x.length; i++) {\n//        x[i].style.display = \"none\";  \n//     }\n//     myIndex++;\n//     if (myIndex > x.length) {myIndex = 1}    \n//     x[myIndex-1].style.display = \"block\";  \n//     setTimeout(carousel, 2000); // Change image every 2 seconds\n// }\n\n// var slides = document.querySelectorAll('#slides .slide');\n// var currentSlide = 0;\n// var slideInterval = setInterval(nextSlide,2000);\n\n// function nextSlide() {\n//     slides[currentSlide].className = 'slide';\n//     currentSlide = (currentSlide+1)%slides.length;\n//     slides[currentSlide].className = 'slide showing';\n// }\n\n\n$(\"nav\").find(\"a\").click(function (e) {\n  e.preventDefault();\n  var section = $(this).attr(\"href\");\n  $(\"html, body\").animate({\n    scrollTop: $(section).offset().top\n  });\n});\n\n//nodemailer\n\n$('#contactSubmit').click(function () {\n  console.log('button clicked..now you can send');\n});\n\n$('#contactSubmit').click(function () {\n  var name = $('#name').val();\n  var email = $('#email').val();\n  var number = $('#number').val();\n  var message = $('#message').val();\n  $.ajax({\n    method: 'POST',\n    url: 'http://localhost:3000/api/contact',\n    contentType: 'application/json',\n    data: JSON.stringify({\n      name: name, email: email, number: number, message: message\n    }),\n    // data: $('#contactForm').serialize(),\n    success: function success(data) {\n      console.log(data);\n    },\n    error: function error(err) {\n      console.log('error handling message', err);\n    }\n  });\n});\n\n//stripe payment\n\n\n// functions for stripe\n// function addStripeInformation(data) {\n//   var handler = StripeCheckout.configure({\n//     key: 'KEY_EDITED_OUT',\n//     token: function(token) {\n//       $.ajax({\n//         url: 'http://localhost:3000/api/charge',\n//         method: \"POST\",\n//         data: {\n//           \"token\" : token.id,\n//           \"email\" : data.email\n//         }\n//       });\n//     }\n//   });\n\n// Open Checkout with further options\n// handler.open({\n//   email: data.email,\n//   name: data.name,\n//   description: 'Adding payment information',\n//   zipCode: false,\n//   panelLabel: \"Add Information\"\n// });\n\n\n// Close Checkout on page navigation\n//   $(window).on('popstate', function() {\n//     handler.close();\n//   }); \n// }\n\n$('#customButton').click(function (e) {\n  console.log('button click to start stripe');\n  $.ajax({\n    method: 'POST',\n    url: 'http://localhost:3000/charge',\n    contentType: 'application/json',\n    // data: JSON.stringify({\n    //   name:name, email:email, number:number, message:message\n    // }),\n    // data: $('#contactForm').serialize(),\n    success: function success(data) {\n      console.log(data);\n    },\n    error: function error(err) {\n      console.log('error handling message', err);\n    }\n  });\n});\n\nvar stripe = Stripe('pk_test_H70vmlNTo3eiFAtoKB2AJAoh');\nvar elements = stripe.elements();\n// var card = elements.create('card');\n\n// Custom styling can be passed to options when creating an Element.\nvar style = {\n  base: {\n    // Add your base input styles here. For example:\n    fontSize: '16px',\n    color: \"#32325d\"\n  }\n};\n\n// Create an instance of the card Element.\nvar card = elements.create('card', { style: style });\n\n// Add an instance of the card Element into the `card-element` <div>.\ncard.mount('#card-element');\n\ncard.addEventListener('change', function (_ref) {\n  var error = _ref.error;\n\n  var displayError = document.getElementById('card-errors');\n  if (error) {\n    displayError.textContent = error.message;\n  } else {\n    displayError.textContent = '';\n  }\n});\n\n// Create a token or display an error when the form is submitted.\nvar form = document.getElementById('payment-form');\nform.addEventListener('submit', function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {\n    var _ref3, token, error, errorElement;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            event.preventDefault();\n\n            _context.next = 3;\n            return stripe.createToken(card);\n\n          case 3:\n            _ref3 = _context.sent;\n            token = _ref3.token;\n            error = _ref3.error;\n\n\n            if (error) {\n              // Inform the customer that there was an error.\n              errorElement = document.getElementById('card-errors');\n\n              errorElement.textContent = error.message;\n            } else {\n              // Send the token to your server.\n              stripeTokenHandler(token);\n            }\n\n          case 7:\n          case 'end':\n            return _context.stop();\n        }\n      }\n    }, _callee, undefined);\n  }));\n\n  return function (_x) {\n    return _ref2.apply(this, arguments);\n  };\n}());\n\nvar stripeTokenHandler = function stripeTokenHandler(token) {\n  // Insert the token ID into the form so it gets submitted to the server\n  var form = document.getElementById('payment-form');\n  var hiddenInput = document.createElement('input');\n  hiddenInput.setAttribute('type', 'hidden');\n  hiddenInput.setAttribute('name', 'stripeToken');\n  hiddenInput.setAttribute('value', token.id);\n  form.appendChild(hiddenInput);\n\n  // Submit the form\n  form.submit();\n};\n\n// var handler = StripeCheckout.configure({\n//   key: 'pk_test_H70vmlNTo3eiFAtoKB2AJAoh',\n//   image: 'https://stripe.com/img/documentation/checkout/marketplace.png',\n//   locale: 'auto',\n//   token: function(token) {\n//     // You can access the token ID with `token.id`.\n//     // Get the token ID to your server-side code for use.\n//     $.ajax({\n//       url: 'http://localhost:3000/charge',\n//       method: \"POST\",\n//       contentType: 'application/json',\n//       data: {\n//         stripeToken : token.id,\n//         email: token.email,\n//         token:token\n//       }\n//     });\n//   }\n// });\n\n// document.getElementById('customButton').addEventListener('click', function(e) {\n//   // Open Checkout with further options:\n//   handler.open({\n//     name: 'PMM Picnic',\n//     description: '2 widgets',\n//     amount: 2000\n//   });\n//   e.preventDefault();\n// });\n\n// // Close Checkout on page navigation:\n// window.addEventListener('popstate', function() {\n//   handler.close();\n// });\n\n//# sourceURL=webpack:///./client/src/index.js?");

/***/ }),

/***/ "./client/src/index.scss":
/*!*******************************!*\
  !*** ./client/src/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\nmodule.exports = {\"landing\":\"index__landing__2gXsf\"};\n\n//# sourceURL=webpack:///./client/src/index.scss?");

/***/ }),

/***/ 0:
/*!***********************************************************!*\
  !*** multi ./client/src/index.js ./client/src/index.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./client/src/index.js */\"./client/src/index.js\");\nmodule.exports = __webpack_require__(/*! ./client/src/index.scss */\"./client/src/index.scss\");\n\n\n//# sourceURL=webpack:///multi_./client/src/index.js_./client/src/index.scss?");

/***/ })

/******/ });