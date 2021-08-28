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
    var query1 = 'SELECT * FROM playlist WHERE playlist_title = ? AND music_id = ?' // 해당 재생목록의 음악 중복 체크 쿼리문
    var query2 = 'INSERT INTO playlist(playlist_title, music_id) VALUES(?, ?)'; // 음악 추가 쿼리문
    var query3 = 'DELETE FROM playlist WHERE playlist_title = ? AND music_id = ?;' + 'INSERT INTO playlist(playlist_title, music_id) VALUES(?, ?);' // 기존 음악을 삭제하고 새로 음악 추가 쿼리문

    connection.query(query1, [playlist_title, music_id], function (error, result) {
        // 해당 재생목록에 음악이 없는 경우 음악 추가
        if(result.length == 0) {
            connection.query(query2, [playlist_title, music_id], function (error, result) {
                if(error) { // 에러 발생시
                    console.log("error ocurred: ", error);
                    res.json({"code" : 400, "result": "error ocurred"});
                } else {
                    console.log("music add success");
                    res.json({ "code": 200, "result": "music add success"});
                }
            });
        } else {
            connection.query(query3, [playlist_title, music_id, playlist_title, music_id], function (error, result) {
                if(error) { // 에러 발생시
                    console.log("error ocurred: ", error);
                    res.json({"code" : 400, "result": "error ocurred"});
                } else {
                    console.log("music add success");
                    res.json({ "code": 200, "result": "music add success"});
                }
            });
        }
    });
});

module.exports = router;