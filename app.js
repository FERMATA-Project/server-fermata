var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var playlistLatelyRouter = require('./routes/playlist_lately');  //최근 재생목록 5개 라우터
var playlistListRouter = require('./routes/playlist_list'); //재생목록 리스트 라우터
var playlistlikesRouter = require('./routes/playlist_likes');  //좋아요 리스트 라우터
var playlistAddRouter = require('./routes/playlist_add');  //리스트 저장 라우터
var plNowRouter = require('./routes/playlist_now.js'); //현재 재생목록
var deletePlaylist = require('./routes/delete_playlist.js'); // 플레이리스트 삭제
var musicRecentRouter = require('./routes/getmusic_recent'); // 음악 최신 재생한 순 라우터
var musicTimesRouter = require('./routes/getmusic_times'); // 음악 많이 재생한 순 라우터
var musicAlphabetRouter = require('./routes/getmusic_alphabet'); // 음악 가나다순 라우터
var searchRouter = require('./routes/search'); // 음악 검색 라우터
var addMusicRouter = require('./routes/add_music'); // 플레이리스트에 음악 추가 라우터
var playMusicRouter = require('./routes/play_music'); // 음악 재생 라우터
var updateLikeRouter = require('./routes/update_like'); // 좋아요 상태 변경 라우터

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
app.use('/music', playlistLatelyRouter);
app.use('/music', playlistlikesRouter);
app.use('/playlist', playlistListRouter);
app.use('/playlist', playlistAddRouter);
app.use('/playlist', plNowRouter); //http://localhost:3000/playlist/now
app.use('/playlist', deletePlaylist); //http://localhost:3000/playlist/delete
app.use('/playlist', plNowRouter);
app.use('/music', musicRecentRouter);
app.use('/music', musicTimesRouter);
app.use('/music', musicAlphabetRouter);
app.use('/music', searchRouter);
app.use('/music', addMusicRouter);
app.use('/music', playMusicRouter); //http://localhost:3000/music/play?music_id=1
app.use('/music', updateLikeRouter);

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
