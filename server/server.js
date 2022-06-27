const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer = require('multer')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

//alternatively use package 'ckey' for dotenv alternative, package uses dotenv config({ path: require('find-config')('.env) })
//const ck = require('ckey);
//var mongoURI = ck.mongouri;

const app = express();
const upload = multer();

var mongoURI = process.env.mongouri;

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); 
app.use(express.static('public'));

app.use('/api/user', require('./routes/auth'));
app.use('/api', require('./routes/history'));
app.use('/api', require('./routes/post'));


mongoose
.connect(mongoURI)
.then(console.log("connected to DB"));

app.listen(5000, ()=>{console.log(`server running on port 5000`)});