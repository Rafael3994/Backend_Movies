var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')



var mongoose = require("mongoose");
require('dotenv').config();

connect();




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pedidosRouter = require('./routes/pedidos');
// var peliculasRouter = require('./routes/peliculas');
var peliculasRouter = require('./routes/peliculasAPI');

var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pedidos', pedidosRouter);
app.use('/peliculas', peliculasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

function listen() {
}


function connect() {
  try {
    mongoose.connection
      .on("error", console.log)
      .on("disconnected", connect)
      .once("open", listen);
    var connection = require('./config/mongoose');
    return connection;
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = app;
