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
eval("\n\n$(function () {\n  console.log('ready!');\n  // grab the initial top offset of the navigation \n  var stickyNavTop = $('.nav').offset().top;\n\n  // our function that decides weather the navigation bar should have \"fixed\" css position or not.\n  var stickyNav = function stickyNav() {\n    var scrollTop = $(window).scrollTop(); // our current vertical position from the top\n\n    // if we've scrolled more than the navigation, change its position to fixed to stick to top,\n    // otherwise change it back to relative\n    if (scrollTop > stickyNavTop) {\n      $('.hero-nav').addClass('sticky');\n    } else {\n      $('.hero-nav').removeClass('sticky');\n    }\n  };\n\n  stickyNav();\n  // and run it again every time you scroll\n  $(window).scroll(function () {\n    stickyNav();\n  });\n});\n// COUNTDOWN \n/* --------------------------\n * GLOBAL VARS\n * -------------------------- */\n// The date you want to count down to\nvar dateStr = \"13/05/2019 08:18\";\nvar date = dateStr.split(/\\s|\\/|:/);\nvar targetDate = new Date(date[2], date[1], date[0], date[3], date[4]);\n// var targetDate = new Date(\"2018/4/16\");   \n\n// Other date related variables\nvar days;\nvar hrs;\nvar min;\nvar sec;\n\n/* --------------------------\n * ON DOCUMENT LOAD\n * -------------------------- */\n$(function () {\n  // Calculate time until launch date\n  timeToLaunch();\n  // Transition the current countdown from 0 \n  numberTransition('#days .number', days, 1000, 'easeOutQuad');\n  numberTransition('#hours .number', hrs, 1000, 'easeOutQuad');\n  numberTransition('#minutes .number', min, 1000, 'easeOutQuad');\n  numberTransition('#seconds .number', sec, 1000, 'easeOutQuad');\n  // Begin Countdown\n  setTimeout(countDownTimer, 1001);\n});\n\n/* --------------------------\n * FIGURE OUT THE AMOUNT OF \n   TIME LEFT BEFORE LAUNCH\n * -------------------------- */\nfunction timeToLaunch() {\n  // Get the current date\n  var currentDate = new Date();\n\n  // Find the difference between dates\n  var diff = (currentDate - targetDate) / 1000;\n  var diff = Math.abs(Math.floor(diff));\n\n  // Check number of days until target\n  days = Math.floor(diff / (24 * 60 * 60));\n  sec = diff - days * 24 * 60 * 60;\n\n  // Check number of hours until target\n  hrs = Math.floor(sec / (60 * 60));\n  sec = sec - hrs * 60 * 60;\n\n  // Check number of minutes until target\n  min = Math.floor(sec / 60);\n  sec = sec - min * 60;\n}\n\n/* --------------------------\n * DISPLAY THE CURRENT \n   COUNT TO LAUNCH\n * -------------------------- */\nfunction countDownTimer() {\n\n  // Figure out the time to launch\n  timeToLaunch();\n\n  // Write to countdown component\n  $(\"#days .number\").text(days);\n  $(\"#hours .number\").text(hrs);\n  $(\"#minutes .number\").text(min);\n  $(\"#seconds .number\").text(sec);\n\n  // Repeat the check every second\n  setTimeout(countDownTimer, 1000);\n}\n\n/* --------------------------\n * TRANSITION NUMBERS FROM 0\n   TO CURRENT TIME UNTIL LAUNCH\n * -------------------------- */\nfunction numberTransition(id, endPoint, transitionDuration, transitionEase) {\n  // Transition numbers from 0 to the final number\n  $({ numberCount: $(id).text() }).animate({ numberCount: endPoint }, {\n    duration: transitionDuration,\n    easing: transitionEase,\n    step: function step() {\n      $(id).text(Math.floor(this.numberCount));\n    },\n    complete: function complete() {\n      $(id).text(this.numberCount);\n    }\n  });\n};\n\n// END COUNTDOWN\n// function init_map(){\n//     var myOptions = \n//     {\n//         zoom:12,center:new google.maps.LatLng(33.480831,-86.90826800000002),\n//         mapTypeId: google.maps.MapTypeId.ROADMAP\n//     };\n//     map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);\n//     marker = new google.maps.Marker({\n//         map: map,position: new google.maps.LatLng(33.480831,-86.90826800000002)\n//     });\n//     infowindow = new google.maps.InfoWindow({\n//         content:'<strong>Miles College</strong><br>5500 Myron Massey Blvd<br>35064 Fairfield<br>'\n//     });\n//     google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);\n//     });\n//     infowindow.open(map,marker);\n// }\n// google.maps.event.addDomListener(window, 'load', init_map);\n\n//# sourceURL=webpack:///./client/src/index.js?");

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