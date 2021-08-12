// 플레이리스트 음악 추가
//Author : Soohyun, Last Modified : 2021.08.12

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init()
connection.connect();

router.post('/add', function (req, res) {
    var playlist_title = req.body.playlist_title; // 재생목록 이름
    var music_id = req.body.music_id; // 음악 아이디
    var query = 'INSERT INTO playlist(playlist_title, music_id) VALUES(?, ?)'; // 음악 추가 쿼리문

    connection.query(query, [playlist_title, music_id], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({"code" : 400, "result": "error ocurred"});
        } else {
            console.log("music add success");
            res.json({ "code": 200, "result": "music add success"});
        }
    });
});

module.exports = router;