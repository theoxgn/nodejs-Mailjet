const express = require("express");
const app = express();
const http = require("http").createServer(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data

// cek server
app.get("/ping", (req, res) => {
    res.json({
        error: false,
        message: "Server is healthy",
    });
});


app.get("/", async(req, res) => {
    res.json({
        message: "ngapain",
    });
});

// require router
const router = require('./src/index');
app.use('/v1/', router);

const port = 3001
var Server = http.listen(port, () =>{
    // cek server
});