// 좋아요 상태 변경
//Author : Soohyun, Last Modified : 2021.08.12

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init()
connection.connect();

router.post('/like', function (req, res) {
    var music_id = req.body.music_id; // 음악 아이디
    var like = req.body.like; // 좋아요 여부
    var query = 'UPDATE music SET likes = ? WHERE music_id = ?'; // 좋아요 상태 변경 쿼리문

    connection.query(query, [like, music_id], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({"code" : 400, "result": "error ocurred"});
        } else {
            console.log("like success");
            res.json({ "code": 200, "result": "like success"});
        }
    });
});

module.exports = router;