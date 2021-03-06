// 음악 많이 재생한 순 조회
//Author : Soohyun, Last Modified : 2021.08.05

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init()
connection.connect();

router.post('/times', function (req, res) {
    var query = 'SELECT * FROM music ORDER BY count desc'; // 음악 많이 재생한 순 쿼리문

    connection.query(query, function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({"code" : 400, "result": "error ocurred"});
        } else {
            console.log("music times success");
            res.json({ "code": 200, "music": result });
        }
    });
});

module.exports = router;