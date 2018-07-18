import AWS from 'aws-sdk';
import { Router } from 'express';
import multer from 'multer';
import Table from '../utils/table';
import { row, rows, empty } from '../config/db';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

//information from .env_var(accessKey,secretKey,region,bucketname)
AWS.config = new AWS.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
AWS.config.region = process.env.AWS_REGION;
const bucketName = process.env.AWS_S3_BUCKET;


const s3 = new AWS.S3();

const photos = new Table('photos')

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



router.post('/', upload.single('imageFile'),(req,res)=>{
    console.log('this is the file', req.file);
    photos.insert({
        imageName: req.file.originalname,
        url: req.file.location
    })
    .then(() => {
        res.json({
            code: 201,
            data: {
                imageName: req.file.originalname,
                url: req.file.location
            }
        })
    })
    .catch((err) => {
        console.log(err)
    })
});

export default router;