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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
eval("\n\n$(document).ready(function () {\n\n  // START NAVBAR\n  // grab the initial top offset of the navigation \n  var stickyNavTop = $('.nav').offset().top;\n\n  // our function that decides weather the navigation bar should have \"fixed\" css position or not.\n  var stickyNav = function stickyNav() {\n    var scrollTop = $(window).scrollTop(); // our current vertical position from the top\n\n    // if we've scrolled more than the navigation, change its position to fixed to stick to top,\n    // otherwise change it back to relative\n    if (scrollTop > stickyNavTop) {\n      $('.hero-nav').addClass('sticky');\n    } else {\n      $('.hero-nav').removeClass('sticky');\n    }\n  };\n\n  stickyNav();\n  // and run it again every time you scroll\n  $(window).scroll(function () {\n    stickyNav();\n  });\n  //END NAVBAR\n  //AUTOCOMPLETE ZIP CODE INPUT USING ZIPCODEAPI.COM\n\n\n  //NODEMAILER FOR CONTACT FORM\n  // Used to format phone number\n  function phoneFormatter() {\n    $('#number').on('input', function () {\n      var number = $(this).val().replace(/[^\\d]/g, '');\n      if (number.length == 7) {\n        number = number.replace(/(\\d{3})(\\d{4})/, \"$1-$2\");\n      } else if (number.length == 10) {\n        number = number.replace(/(\\d{3})(\\d{3})(\\d{4})/, \"($1) $2-$3\");\n      }\n      $(this).val(number);\n    });\n  };\n\n  $(phoneFormatter);\n\n  $('#contactSubmit').click(function () {\n    var name = $('#name').val();\n    var email = $('#email').val();\n    var number = $('#number').val();\n    var message = $('#message').val();\n\n    fetch('http://localhost:3000/api/contact', {\n      method: 'POST', // or 'PUT'\n      body: JSON.stringify({\n        name: name, email: email, number: number, message: message\n      }),\n      headers: {\n        'Content-Type': 'application/json'\n      }\n    }).then(function (res) {\n      return res.json();\n    }).catch(function (error) {\n      return console.error('Error:', error);\n    }).then(function (response) {\n      console.log('Success:', response);\n      setTimeout(function () {\n        window.location.reload();\n      }, 10);\n    });\n\n    // $.ajax({\n    //   method: 'POST',\n    //   url: 'http://localhost:3000/api/contact',\n    //   contentType: 'application/json',\n    //   data: JSON.stringify({\n    //     name: name, email: email, number: number, message: message\n    //   }),\n    //   // data: $('#contactForm').serialize(),\n    //   success: function (data) {\n    //     console.log(data);\n    //   },\n    //   error: function (err) {\n    //     console.log('error handling message', err);\n    //   }\n    // });\n  });\n  //END NODEMAILER\n\n  //MEMBER SIGNUP TO ADD TO BE ADDED TO DATABASE\n  $('#memberSubmit').click(function (e) {\n    e.preventDefault();\n\n    var name = $('#memberName').val();\n    var email = $('#memberEmail').val();\n    var number = $('#memberNumber').val();\n    var location = $('#memberLocation').val();\n    var crabYear = $('#memberCrabYear').val();\n\n    fetch('http://localhost:3000/api/signup', {\n      method: 'POST', // or 'PUT'\n      body: JSON.stringify({\n        name: name, email: email, phoneNumber: number, location: location, crabYear: crabYear\n      }),\n      headers: {\n        'Content-Type': 'application/json'\n      }\n    }).then(function (res) {\n      return res.json();\n    }).catch(function (error) {\n      return console.error('Error:', error);\n    }).then(function (response) {\n      console.log('Success:', response);\n      setTimeout(function () {\n        window.location.reload();\n      }, 10);\n    });\n\n    // $.ajax({\n    //   url: 'http://localhost:3000/api/signup',\n    //   method: 'POST',\n    //   contentType: 'application/json',\n    //   data: JSON.stringify({\n    //     name: name, email: email, phoneNumber: number, location: location, crabYear: crabYear\n    //   }),\n    //   success: (data) => {\n    //     console.log(data);\n    //     setTimeout(() => {\n    //       //  window.location.reload(); \n    //       }, 10)\n    //   },\n    //   error: function (err) {\n    //     console.log('error handling message', err);\n    //   },\n    //   dataType: 'json'\n    // });\n  });\n  //END MEMBER SIGNUP\n\n  //START STRIPE PAYMENT\n\n  var stripePK = 'pk_test_obzu76S8L0GFvqkXbKn204a2';\n\n  var handlerGold = StripeCheckout.configure({\n    key: stripePK,\n    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',\n    locale: 'auto',\n    zipCode: true,\n    billingAddress: true,\n    token: function token(_token, args) {\n      console.log('this is tokens', _token);\n      console.log('this is args', args);\n      // You can access the token ID with `token.id`.\n      // Get the token ID to your server-side code for use.\n      fetch('http://localhost:3000/api/charge/gold', {\n        method: \"POST\",\n        headers: {\n          'Accept': 'application/json',\n          'Content-Type': 'application/json',\n          'Authorization': 'Bearer' + stripePK\n        },\n        body: JSON.stringify(_token, args)\n      }).then(function (output) {\n        console.log(output);\n        if (output.status === \"succeeded\") document.getElementById(\"shop\").innerHTML = \"<p>Purchase complete!</p>\";\n      }).catch(function (error) {\n        if (error.status === 400) {\n          console.log('Bad request, often due to missing a required parameter.', error);\n        } else if (error.status === 401) {\n          console.log('No valid API key provided.', error);\n        } else if (error.status === 404) {\n          console.log('The requested resource doesn\\'t exist.', error);\n        } else if (error.status === 500) {\n          console.log('Purchase Failed', error);\n        }\n      });\n    }\n  });\n\n  var handlerPurple = StripeCheckout.configure({\n    key: stripePK,\n    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',\n    locale: 'auto',\n    zipCode: true,\n    billingAddress: true,\n    token: function token(_token2, args) {\n      // You can access the token ID with `token.id`.\n      // Get the token ID to your server-side code for use.\n      fetch('http://localhost:3000/api/charge/purple', {\n        method: \"POST\",\n        headers: {\n          'Accept': 'application/json',\n          'Content-Type': 'application/json',\n          'Authorization': 'Bearer' + stripePK\n        },\n        body: JSON.stringify(_token2, args)\n      }).then(function (output) {\n        if (output.status === \"succeeded\") document.getElementById(\"shop\").innerHTML = \"<p>Purchase complete!</p>\";\n      }).catch(function (error) {\n        if (error.status === 400) {\n          console.log('Bad request, often due to missing a required parameter.', error);\n        } else if (error.status === 401) {\n          console.log('No valid API key provided.', error);\n        } else if (error.status === 404) {\n          console.log('The requested resource doesn\\'t exist.', error);\n        } else if (error.status === 500) {\n          console.log('Purchase Failed', error);\n        }\n      });\n    }\n  });\n\n  var handlerWhite = StripeCheckout.configure({\n    key: stripePK,\n    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',\n    locale: 'auto',\n    zipCode: true,\n    billingAddress: true,\n    token: function token(_token3, args) {\n      // You can access the token ID with `token.id`.\n      // Get the token ID to your server-side code for use.\n      fetch('http://localhost:3000/api/charge/white', {\n        method: \"POST\",\n        headers: {\n          'Accept': 'application/json',\n          'Content-Type': 'application/json',\n          'Authorization': 'Bearer' + stripePK\n        },\n        body: JSON.stringify(_token3, args)\n      }).then(function (output) {\n        if (output.status === \"succeeded\") document.getElementById(\"shop\").innerHTML = \"<p>Purchase complete!</p>\";\n      }).catch(function (error) {\n        if (error.status === 400) {\n          console.log('Bad request, often due to missing a required parameter.', error);\n        } else if (error.status === 401) {\n          console.log('No valid API key provided.', error);\n        } else if (error.status === 404) {\n          console.log('The requested resource doesn\\'t exist.', error);\n        } else if (error.status === 500) {\n          console.log('Purchase Failed', error);\n        }\n      });\n    }\n  });\n\n  // $('#goldButton').on('click', function(e) {\n  //   openCheckout(\"Gold Package\", 2000);\n  //   e.preventDefault();\n  // });\n  // $('#purpleButton').on('click', function(e) {\n  //   openCheckout(\"Purple Package\", 1000);\n  //   e.preventDefault();\n  // });\n  // $('#whiteButton').on('click', function(e) {\n  //   openCheckout(\"White Package\", 700);\n  //   e.preventDefault();\n  // });\n\n  function openCheckout(description, amount) {\n    handler.open({\n      name: 'PMM Weekend',\n      description: description,\n      amount: amount\n    });\n  }\n\n  //GOLD PACKAGE BUTTON\n  document.getElementById('goldButton').addEventListener('click', function (e) {\n    // Open Checkout with further options:\n    handlerGold.open({\n      name: 'PMM Picnic',\n      description: 'Gold Package',\n      amount: 2000\n    });\n    e.preventDefault();\n  });\n\n  //PURPLE PACKAGE BUTTON\n  document.getElementById('purpleButton').addEventListener('click', function (e) {\n    // Open Checkout with further options:\n    handlerPurple.open({\n      name: 'PMM Picnic',\n      description: 'Purple Package',\n      amount: 1000\n    });\n    e.preventDefault();\n  });\n\n  //WHITE PACKAGE BUTTON\n  document.getElementById('whiteButton').addEventListener('click', function (e) {\n    // Open Checkout with further options:\n    handlerWhite.open({\n      name: 'PMM Picnic',\n      description: 'White Package(Student & Staff Only)',\n      amount: 700\n    });\n    e.preventDefault();\n  });\n\n  // Close Checkout on page navigation:\n  window.addEventListener('popstate', function () {\n    handlerGold.close();\n  });\n  window.addEventListener('popstate', function () {\n    handlerPurple.close();\n  });\n  window.addEventListener('popstate', function () {\n    handlerWhite.close();\n  });\n\n  //END STRIPE\n\n  //START IMAGE GALLERY\n  var photoGallery = function photoGallery($photoGalleryElement) {\n    var $photoGallery = $photoGalleryElement,\n        $photoLinks = $photoGallery.find('a[href*=\"#photo\"]'),\n        $photos = $photoGallery.find('img[id*=\"photo\"]'),\n        activeClass = 'active';\n\n    function init() {\n      $photoGallery.addClass('enabled');\n\n      $photoGallery.on({\n        click: function click(e) {\n          e.preventDefault();\n          var $photoTarget = $(this).attr('href');\n          $photos.removeClass(activeClass);\n          $photoGallery.find($photoTarget).addClass(activeClass);\n        }\n      }, 'a[href*=\"#photo\"]');\n    }\n\n    init();\n  };\n\n  $.each($('.photo-gallery'), function () {\n    // Try commenting out this line below to see no-js functionality!\n    var gallery = new photoGallery($(this));\n  });\n\n  // COUNTDOWN \n\n  // The date you want to count down to\n  var dateStr = \"5/04/2019 08:18\";\n  var date = dateStr.split(/\\s|\\/|:/);\n  // var targetDate = new Date(date[2], date[1], date[0], date[3], date[4]);\n  var targetDate = new Date(\"2019/4/5\");\n\n  // Other date related variables\n  var days;\n  var hrs;\n  var min;\n  var sec;\n\n  /* --------------------------\n   * ON DOCUMENT LOAD\n   * -------------------------- */\n  $(function () {\n    // Calculate time until launch date\n    timeToLaunch();\n    // Transition the current countdown from 0 \n    numberTransition('#days .number', days, 1000, 'easeOutQuad');\n    numberTransition('#hours .number', hrs, 1000, 'easeOutQuad');\n    numberTransition('#minutes .number', min, 1000, 'easeOutQuad');\n    numberTransition('#seconds .number', sec, 1000, 'easeOutQuad');\n    // Begin Countdown\n    setTimeout(countDownTimer, 1001);\n  });\n\n  /* --------------------------\n   * FIGURE OUT THE AMOUNT OF \n     TIME LEFT BEFORE LAUNCH\n   * -------------------------- */\n  function timeToLaunch() {\n    // Get the current date\n    var currentDate = new Date();\n\n    // Find the difference between dates\n    var diff = (currentDate - targetDate) / 1000;\n    var diff = Math.abs(Math.floor(diff));\n\n    // Check number of days until target\n    days = Math.floor(diff / (24 * 60 * 60));\n    sec = diff - days * 24 * 60 * 60;\n\n    // Check number of hours until target\n    hrs = Math.floor(sec / (60 * 60));\n    sec = sec - hrs * 60 * 60;\n\n    // Check number of minutes until target\n    min = Math.floor(sec / 60);\n    sec = sec - min * 60;\n  }\n\n  /* --------------------------\n   * DISPLAY THE CURRENT \n     COUNT TO LAUNCH\n   * -------------------------- */\n  function countDownTimer() {\n\n    // Figure out the time to launch\n    timeToLaunch();\n\n    // Write to countdown component\n    $(\"#days .number\").text(days);\n    $(\"#hours .number\").text(hrs);\n    $(\"#minutes .number\").text(min);\n    $(\"#seconds .number\").text(sec);\n\n    // Repeat the check every second\n    setTimeout(countDownTimer, 1000);\n  }\n\n  /* --------------------------\n   * TRANSITION NUMBERS FROM 0\n     TO CURRENT TIME UNTIL LAUNCH\n   * -------------------------- */\n  function numberTransition(id, endPoint, transitionDuration, transitionEase) {\n    // Transition numbers from 0 to the final number\n    $({ numberCount: $(id).text() }).animate({ numberCount: endPoint }, {\n      duration: transitionDuration,\n      easing: transitionEase,\n      step: function step() {\n        $(id).text(Math.floor(this.numberCount));\n      },\n      complete: function complete() {\n        $(id).text(this.numberCount);\n      }\n    });\n  };\n\n  // END COUNTDOWN\n});\n// $(\"nav\").find(\"a\").click(function (e) {\n//   e.preventDefault();\n//   var section = $(this).attr(\"href\");\n//   $(\"html, body\").animate({\n//     scrollTop: $(section).offset().top\n//   });\n// });\n\n//# sourceURL=webpack:///./client/src/index.js?");

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./client/src/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./client/src/index.js */\"./client/src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./client/src/index.js?");

/***/ })

/******/ });