const express = require('express');
const cors = require('cors')

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE"],
        credentials: true,
    })
);

app.use('/register', require('./routes/auth'))

app.listen(5000, ()=>{console.log("server running on port 5000")})