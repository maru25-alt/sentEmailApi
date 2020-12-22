import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

//app config
const app = express();
const PORT = process.env.PORT || 5000

//middleware
app.use(express.json());
app.use(cors());

//nodemailer
var transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'gmail',
    auth: {
           user: 'rudomaru25@gmail.com',
           pass: '0782676305'
       }
});

app.use(function(req, res, next){
    console.log(`${req.method},  ${res.statusCode}`);
    next()
})
//api routes
app.get('/', (req, res) => {
    res.status(200).send(`Welcome to my app`)
})

app.post('/api/send_email', (req, res) => {
    const email = req.body.email;
    const calender = req.body.calender
    const mailOptions = {
        from: 'rudomaru25@email.com', // sender address
        to: email, // list of receivers
        subject: 'Calender values', // Subject line
        text: `Message from Calender: ${calender}`// plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
         if(err)
          res.status(500).send(err)
         else
           res.status(201).send(info);
      });
   
   
})

//listen
app.listen(PORT, () => {
    return console.log(`listening on port ${PORT}`)
})