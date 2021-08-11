var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var plNowRouter = require('./routes/playlist_now.js'); //현재 재생목록
var deletePlaylist = require('./routes/delete_playlist.js'); // 플레이리스트 삭제
var musicRecentRouter = require('./routes/getmusic_recent'); // 음악 최신 재생한 순 라우터
var musicTimesRouter = require('./routes/getmusic_times'); // 음악 많이 재생한 순 라우터
var musicAlphabetRouter = require('./routes/getmusic_alphabet.js'); // 음악 가나다순 라우터

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/playlist', plNowRouter); //http://localhost:3000/playlist/now
app.use('/playlist', deletePlaylist); //http://localhost:3000/playlist/delete
app.use('/music', musicRecentRouter);
app.use('/music', musicTimesRouter);
app.use('/music', musicAlphabetRouter);

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
