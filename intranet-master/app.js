var express = require('express');
var mysql = require('mysql');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var connection = mysql.createConnection({
  host     : 'dbinstance.ct1hpvcvdghg.us-east-1.rds.amazonaws.com',
  user     : '',
  password : '',
  database : 'intranetDatabase',
  port : '3306'
});
connection.connect();
//Query the database
connection.query('Select * from employee_details', function (err, results) {
  if (err) {
    app.locals.databases = err.stack;
  }
  if (results) {
    for (var i in results) {
      var obj = results[i];
      var  outputString = results[i].employee_name + ", " + results[i].employee_username;
        console.log(outputString);
      }

  }
});

connection.end();
// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
