'use strict';

var _express = require('express');

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
var multer = (0, _multer2.default)();
_dotenv2.default.config();

_cloudinary2.default.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

router.get('/', function (req, res) {
    _cloudinary2.default.image();
});
router.get('/:id', function (req, res) {});
router.post('/', multer.single('imageFile'), function (req, res) {

    // cloudinary.uploader.upload(req.url), (err, result) => {
    //     if(err){
    //         console.log("there was an error", err);
    //     }
    //     else{
    //         console.log(result);
    //         res.send(200)
    //     }
    // });
});
router.delete('/:id', function (req, res) {});

module.exports = router;