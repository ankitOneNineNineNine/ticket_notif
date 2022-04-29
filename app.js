const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const request = require('request-promise');
const cheerio = require('cheerio')
require('dotenv').config();
const app = express();
const cron = require('node-cron')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 

// document.querySelector('.show-time-wrap')

function check() {
  request("https://www.fcubecinemas.com/show/1135/Doctor-Strange-in-the-Multiverse-of-Madness-(PG)", (error, response, html) => {
    if (!error & response.statusCode == 200) {
      const $ = cheerio.load(html)
      const datarow = $(".show-time-wrap");
      if (datarow['0']) {


        client.messages
          .create({
            body: 'La ayo ticket',
            from: '+13252405920',
            to: '+9779860678182'
          })
          .then(message =>{});
      }
    }
  })
}

cron.schedule('*/30 * * * *', ()=>{
  check()
  // console.log('Running')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(process.env.PORT, '0.0.0.0', ()=>{
  console.log('Connected to PORT')
})