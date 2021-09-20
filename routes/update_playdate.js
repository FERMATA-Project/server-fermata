// 음악 재생 날짜와 재생 횟수 변경
//Author : Dayoung, Last Modified : 2021.08.27
//Author : Soohyun, Last Modified : 2021.09.17

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init()
connection.connect();

router.post('/playdate', function (req, res) {
    var play_date = req.body.play_date; // 재생 날짜 
    var count = req.body.count; // 재생 횟수
    var music_id = req.body.music_id; // 음악 아이디

    var query = 'UPDATE music SET play_date = ?, count = ? WHERE music_id = ?'; 

    connection.query(query, [play_date, count, music_id], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({"code" : 400, "result": "error ocurred"});
        } else {
            console.log("like success");
            res.json({ "code": 200, "result": "update play_date success"});
        }
    });
});

module.exports = router;