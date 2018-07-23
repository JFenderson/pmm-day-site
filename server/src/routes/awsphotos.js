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
AWS.config.update({
    accessKeyId: ,
    secretAccessKey: ,
    region: "us-east-1"
  });
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const bucketName = 'pmmpicnic96';


const photos = new Table('photos')

const upload = multer({
    contentType: 'image/jpeg',
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
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

    s3.listBuckets(function(err, data) {
        if (err) {
           console.log("Error", err);
        } else {
           console.log("Bucket List", data.Buckets);
        }
     });
    s3.listObjects({Bucket: 'pmmpicnic96'},(err, data)=> {
        if (err) {
            console.log("Error", err);
         } else {
            console.log("Bucket Object List", data);
         }
    })
})

router.get('/:id', (req,res)=>{
    let id = req.params.id
    photos.getOne(id)
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