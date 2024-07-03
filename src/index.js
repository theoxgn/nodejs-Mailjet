var express = require('express');
require('dotenv').config();
var router = express.Router();

const mailjetClient = require('node-mailjet');
const apiKey = process.env.API_KEY;
const secretKey = process.env.SECRET_KEY;

const mailjet = mailjetClient.apiConnect(apiKey, secretKey);

router.post('/send-mail', function (req, res) {
    // const contentEmail = `
    //     <h1>Hai ${req.body.name},</h1>
    //     <p>Selamat, kamu telah berhasil mengirim email menggunakan Mailjet!</p>
    // `
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [{
                "From": {
                    "Email": "rindayemima.work@gmail.com",
                    "Name": "test Mailjet"
                },
                "To": [{
                    "Email": req.body.email, 
                    "Name": req.body.name    
                }],
                "Subject": "Your email flight plan!",
						"TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
						"HTMLPart": "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
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