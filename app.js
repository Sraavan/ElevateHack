const express = require('express');
const app = express();
const path = require("path");

// logger
const logger = require('morgan');
app.use(logger('dev'));

// body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const userRoute = require('./routes/user');
const anonymousRoute = require('./routes/anonymous');

app.use('/user', userRoute);
app.use('/anonymous', anonymousRoute);




// if not req path match the above route
app.use((req, res, next) => {
  const error = new Error("No found");
  error.status = 404;
  next(error);  // forward the error obj to the next middlewares
});

// catch all types of error that could be from the above or throw by database or other applications
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message }
  });
});


module.exports = app;




// app.use('/', express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//   console.log("before send");
//   //console.log(child_care);
//   res.sendFile(path.join(__dirname + '/public/index.html'));
// });


// app.get('/index.js', function (req, res) {
//   res.sendFile(path.join(__dirname + '/public/index.js'));
// });

// app.get('/', function (req, res) {
//   console.log(child_care);
//   res.sendFile(path.join(__dirname + '/public/index.html'));

// });