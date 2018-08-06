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
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
var s3 = new _awsSdk2.default.S3({ apiVersion: '2006-03-01' });
var bucketName = process.env.AWS_S3_BUCKET;

var photos = new _table2.default('photos');

var upload = (0, _multer2.default)({
    contentType: 'image/jpeg',
    storage: (0, _multerS2.default)({
        s3: s3,
        acl: 'public-read',
        bucket: bucketName,
        contentType: _multerS2.default.AUTO_CONTENT_TYPE,
        metadata: function metadata(req, file, cb) {
            cb(null, { fieldName: file.originalname });
        },
        key: function key(req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});

router.get('/', function (req, res) {

    photos.getAll().then(function (photos) {
        res.send(photos);
        // res.json(photos)
    }).catch(function (error) {
        if (error.status === 400) {
            console.log('Bad request, often due to missing a required parameter.');
        } else if (error.status === 401) {
            console.log('No valid API key provided.');
        } else if (error.status === 404) {
            console.log('The requested resource doesn\'t exist.');
        } else if (error.status === 500) {
            console.log('Server Error');
        }
    });

    // s3.listBuckets(function(err, data) {
    //     if (err) {
    //        console.log("Error", err);
    //     } else {
    //        console.log(data.Buckets);
    //     }
    //  });
    // s3.listObjects({Bucket: 'pmmpicnic96'},(err, data)=> {
    //     if (err) {
    //         console.log("Error", err);
    //      } else {
    //         console.log("Bucket Object List", data);
    //      }
    // })
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    photos.getOne(id).then(function (photos) {
        console.log('these are get:id images');
        console.log(photos);
        res.json(photos);
    });
});

router.post('/', upload.single('imageFile'), function (req, res) {
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

    // res.send('Successfully uploaded ' + req.files.length + ' files!')
});

router.post('/multi', upload.any(), function (req, res) {
    // console.log('this is the file', req.files);
    req.files.map(function (image, index) {
        photos.insert({
            imageName: image.originalname,
            url: image.location
        }).then(function () {
            res.json({
                code: 201,
                data: {
                    imageName: image.originalname,
                    url: image.location
                }
            });
        }).catch(function (err) {
            console.log(err);
        });
    });

    // res.send('Successfully uploaded ' + req.files.length + ' files!')
});

exports.default = router;