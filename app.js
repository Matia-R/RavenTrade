var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var createAccountRouter = require('./routes/create-account');
var portfolioRouter = require('./routes/portfolio');
var stocksRouter = require('./routes/stocks');
var ordersRouter = require('./routes/orders');
var stockInfoRouter = require('./routes/stock-info');
var watchlistRouter = require('./routes/watchlist');
var alertsRouter = require('./routes/alerts');
var accountHistoryRouter = require('./routes/accountHistory');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/create-account', createAccountRouter);
app.use('/portfolio', portfolioRouter);
app.use('/stocks', stocksRouter);
app.use('/orders', ordersRouter);
app.use('/stock-info', stockInfoRouter);
app.use('/watchlists', watchlistRouter);
app.use('/alerts', alertsRouter);
app.use('/accountHistory', accountHistoryRouter);
app.use('/users', usersRouter);

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

module.exports = app;
