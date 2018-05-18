'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _table = require('../utils/table');

var _table2 = _interopRequireDefault(_table);

var _db = require('../config/db');

var _multerS = require('multer-s3');

var _multerS2 = _interopRequireDefault(_multerS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//information from .env_var(accessKey,secretKey,region,bucketname)
_awsSdk2.default.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
_awsSdk2.default.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
_awsSdk2.default.config.region = process.env.AWS_REGION;
var bucketName = process.env.AWS_S3_BUCKET;

var s3 = new _awsSdk2.default.S3();

var photos = new _table2.default('imageurl');

var router = _express2.default.Router();

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

router.get('/', function (req, res) {
    console.log('i am making the request to get photos');
    photos.getAll().then(function (photos) {
        console.log('these are the urls on the server');
        console.log(photos);
        res.json(photos);
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

router.post('/', upload.single('imageFile'), function (req, res, next) {
    photos.insert({
        imageName: req.file.originalname,
        url: req.file.location,
        familyid: req.query.familyid
    }).then(function () {
        res.json({
            code: 201,
            data: {
                url: req.file.location
            }
        });
    }).catch(function (err) {
        console.log(err);
    });
});

exports.default = router;