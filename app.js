const express = require( 'express');
const cors = require( 'cors');
const nodemailer = require('nodemailer');


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
    const calender = req.body.calendar;
    const date = req.body.date
    console.log(calender)
    let html$ = '';
    if(calender.length > 0){
    for(var key in  calender){
        html$ += `<div> <a href="${calender[key].htmlLink}">
            <h2>${calender[key].summary}</h2>
            <div> Start time: ${calender[key].start.dateTime}</div>
            <div>End Time: ${calender[key].end.dateTime} </div>
            </a> 
        </div>`
    }
   }
   else {
       html$ = "There are no events"
   }
    const mailOptions = {
        from: 'rudomaru25@email.com', // sender address
        to: email, // list of receivers
        subject: 'Calender values', // Subject line
       // text: `Message from Calender: ${calender}`,// plain text body
        html: '<!DOCTYPE html>'+
        '<html><head><title>Appointment</title>'+
        '</head><body><div>'+
        '<h1>Google Calender Events.</h1>'+
        '<h6>'+ 'Events from '+ date +'</h6>' +
        '<p>Here is summery:</p>'+
         html$ +
        '</div></body></html>'
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