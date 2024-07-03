var express = require('express');
require('dotenv').config();
var router = express.Router();
const mailjet = require('node-mailjet').connect(process.env.API_KEY, process.env.SECRET_KEY)

router.post('/send-mail', function (req, res) {
    const contentEmail = `
        <h1>Hai ${req.body.name},</h1>
        <p>Selamat, kamu telah berhasil mengirim email menggunakan Mailjet!</p>
    `
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [{
                "From": {
                    "Email": "aaluff112@gmail.com",
                    "Name": "test Mailjet"
                },
                "To": [{
                    "Email": req.body.email, 
                    "Name": req.body.name    
                }],
                "Subject": "Selamat, email kamu berhasil terkirim",
                "HTMLPart": contentEmail
            }]
        })
    request
        .then((result) => {
            res.send({
                status: result.response.status,
                result: result.body
            });
        })
        .catch((err) => {
            res.send({
                status: err.statusCode,
                massage: err.message
            });
        })
});

router.get("/", (req, res) => {
    return res.send({
        project:'API Web Service '
    });
});

module.exports = router;