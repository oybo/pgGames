var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var webAPIRouter = require('./routes/web-api');
var gameAPIRouter = require('./routes/game-api');

var app = express();

// 配置 CORS 中间件
app.use(cors({
  origin: '*',  // 允许所有来源
  methods: ['POST'],  // 只允许 POST 方法
  allowedHeaders: '*',  // 允许所有请求头
  credentials: true  // 允许跨域请求携带凭证（如 cookies 或 authorization 头）
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/web-api', webAPIRouter);
app.use('/game-api', gameAPIRouter);

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
