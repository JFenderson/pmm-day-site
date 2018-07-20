'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _express = require('express');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _table = require('../utils/table');

var _table2 = _interopRequireDefault(_table);

var _db = require('../config/db');

var _multerS = require('multer-s3');

var _multerS2 = _interopRequireDefault(_multerS);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var router = (0, _express.Router)();

//information from .env_var(accessKey,secretKey,region,bucketname)
_awsSdk2.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});
var s3 = new _awsSdk2.default.S3({ apiVersion: '2006-03-01' });
var bucketName = 'pmmpicnic96';

var myBucket = bucketName;

var myKey = 'myBucketKey';

var photos = new _table2.default('photos');

var upload = (0, _multer2.default)({
    storage: (0, _multerS2.default)({
        s3: s3,
        acl: 'public-read',
        bucket: bucketName,
        metadata: function metadata(req, file, cb) {
            cb(null, { fieldName: file.originalname });
        },
        key: function key(req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});

//  s3.createBucket({Bucket: myBucket}, function(err, data) {

//     if (err) {

//        console.log(err);

//        } else {

//          let params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};

//          s3.putObject(params, function(err, data) {

//              if (err) {

//                  console.log(err)

//              } else {

//                  console.log("Successfully uploaded data to myBucket/myKey");

//              }

//           });

//        }

//     });


router.get('/', function (req, res) {
    console.log('i am making the request to get photos');
    photos.getAll().then(function (photos) {
        console.log('these are the urls on the server');
        console.log(photos);
        res.json(photos);
    });
    s3.listBuckets(function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Bucket List", data.Buckets);
        }
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    photos.getPhotosByFamilyId(id).then(function (photos) {
        console.log('these are get:id images');
        console.log(photos);
        res.json(photos);
    });
});

// router.post('/', s3.upload('imageFile',function (err, data) {
//     //handle error
//     if (err) {
//       console.log("Error", err);
//     }

//     //success
//     if (data) {
//       console.log("Uploaded in:", data.Location);
//     }
//   })
// );


router.post('/', upload.single('imageFile'), function (req, res) {
    console.log('this is the file', req.file);
    photos.insert({
        imageName: req.file.originalname,
        url: req.file.location
    }).then(function () {
        res.json({
            code: 201,
            data: {
                imageName: req.file.originalname,
                url: req.file.location
            }
        });
    }).catch(function (err) {
        console.log(err);
    });
});

exports.default = router;