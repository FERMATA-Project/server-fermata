// music_id 음악 재생
// Author : dayoung, Last Modified : 2021.08.15

var express = require("express");
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/play', function(req, res){ //http://localhost:3000/music/play?music_id=?    
    var musicName = req.query.music_id + ".mp3" 
    var filePath = path.join(__dirname, "..", "music", musicName) // 음악 파일 경로
    var stream = fs.createReadStream(filePath); // 파일 읽는 스트림
  
    // 파일 읽는 중일 때
    stream.on('data', function (data) {
      console.log('playmusic success');
      res.write(data);
    });
  
    // 파일 읽기가 끝났을 때
    stream.on('end', function () {
      console.log('end streaming');
      res.end();
    });
  
    // 파일 읽는 도중 에러 발생했을 때
    stream.on('error', function (err) {
      console.log(err);
      res.end('500 Internal Server ' + err);
    });
  });
  
  module.exports = router;