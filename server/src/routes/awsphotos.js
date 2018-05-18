import AWS from 'aws-sdk';
import express from 'express';
import path from 'path';
import { basename } from 'path';
import multer from 'multer';
import Table from '../utils/table';
import { row, rows, empty } from '../config/db';
import multerS3 from 'multer-s3';


//information from .env_var(accessKey,secretKey,region,bucketname)
AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
AWS.config.region = process.env.AWS_REGION;
const bucketName = process.env.AWS_S3_BUCKET;


const s3 = new AWS.S3();

const photos = new Table('imageurl')

const router = express.Router();



const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: bucketName,
        metadata: function (req, file, cb) {
        cb(null, {fieldName: file.originalname})
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
 });




router.get('/', (req,res)=>{
    console.log('i am making the request to get photos');
    photos.getAll()
    .then(photos => {
        console.log('these are the urls on the server');
        console.log(photos);
        res.json(photos)
    })
})

router.get('/:id', (req,res)=>{
    let id = req.params.id
    photos.getPhotosByFamilyId(id)
    .then(photos => {
        console.log('these are get:id images');
        console.log(photos);
        res.json(photos)
    })

})



router.post('/', upload.single('imageFile'),(req,res,next)=>{
    photos.insert({
        imageName: req.file.originalname,
        url: req.file.location,
        familyid: req.query.familyid
    })
    .then(() => {
        res.json({
            code: 201,
            data: {
                url: req.file.location
            }
        });
    })
    .catch((err) => {
        console.log(err)
    })
});

export default router;