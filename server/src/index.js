import express from 'express';
import { join } from 'path';
import mysql from 'mysql';
import bodyParser from 'body-parser';

const port = 3000

let app = express();
var connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT

});


const CLIENT_PATH = join(__dirname, '../../client');

app.use(express.static(CLIENT_PATH));
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=> {
    res.send('Hello World')
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
        return console.log('something went wrong',err)
    }

    console.log(`Server is listening on Port ${port}`)
})