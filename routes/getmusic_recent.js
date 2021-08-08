// 음악 최신 재생한 순으로 가져오기
//Author : Soohyun, Last Modified : 2021.08.05

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init()
connection.connect();

router.post('/recent', function (req, res) {
    var query = 'SELECT * FROM music ORDER BY play_date desc'; // 음악 최신순 쿼리문

    connection.query(query, function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({"code" : 400, "result": "error ocurred"});
        } else {
            console.log("music recent success");
            res.json({ "code": 200, "music": result });
        }
    });
});

module.exports = router;