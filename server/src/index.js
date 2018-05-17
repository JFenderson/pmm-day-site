import express from 'express';
import { join } from 'path';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import path from 'path';
import nodemailer from 'nodemailer';

const port = 3000;

let app = express();
var connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT

});


const CLIENT_PATH = join(__dirname, '../../client');
app.use(cors());
app.use(express.static(CLIENT_PATH));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });


app.use('/api', routes);
app.get('/', function(req, res){
    res.sendFile(path.join(CLIENT_PATH + '/index.html')); 
  });

app.post('/', (req,res, next) => {
    // res.sendFile(CLIENT_PATH + '/index.html');
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: 'joseph.fenderson@gmail.com',
            clientId: '15915734946-cuije3mk1f0h6bh390rb31fdhos0gjpa.apps.googleusercontent.com',
            clientSecret: 'fJxFiZJLgqsAqtIfQU6w1xbG',
            refreshToken: '1/eVMu8IMRe-tW7e7Z_itySgfclv2TJlMWDPHa4Lja5es',
        }
    });

    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const message = req.body.message;
    const mailOption = {
        from: `${name} <${email}>`,
        to: `${email}`,
        subject: `New Message from ${email} at pmm_day-site`,
        text: message,
        html: `<p>${message}, Sender's Number is ${number}</p>`,
    };

    transporter.sendMail(mailOption,(error, res)=> {
        // console.log(info)
        if (error) {
            console.log('this is the error', error);
            console.log(`these are the req.body.name: ${name}`);
            console.log(`req.body.email:  ${email}`);
            console.log(`req.body.number:  ${number}`);
            console.log(`req.body.message:  ${message}`);
        } else {
            res.sendStatus(201);
        }
        transporter.close();
    });
    next();
    console.log(req.body);
});


connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... ");    
    } else {
        console.log("Error connecting database ... ");    
    }
});

app.listen(port,(err)=> {
    if(err){
        return console.log('something went wrong',err);
    }

    console.log(`Server is listening on Port ${port}`);
});

// export RDS_HOSTNAME="pmmpicnic.ckrnv82mga0r.us-east-1.rds.amazonaws.com"
// export RDS_USERNAME="JFenderson"
// export RDS_PASSWORD="Tori7784"
// export RDS_PORT="3306"
// export RDS_DB_NAME="pmm_picnic"