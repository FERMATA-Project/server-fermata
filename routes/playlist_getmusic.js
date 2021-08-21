//재생목록 음악 가져오기
//Author : seungyeon, Last Modified : 2020.08.21

var express = require("express");
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/playlist_getmusic', function(req, res) {
    var playlist_title = req.body.playlist_title;
    var query = 'SELECT DISTINCT music.* FROM music, playlist WHERE music.music_id = playlist.music_id AND playlist_title = ?';

    connection.query(query, [playlist_title], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({"code" : 400, "result": "error ocurred"});
        } else {
            console.log("playlist getmusic success");
            res.json({ "code": 200, "music": result });
        }
    });
});

module.exports = router;