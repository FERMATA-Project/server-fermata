//재생목록 리스트 가져오기
// Author : seungyeon, Last Modified : 2020.08.10

var express = require("express");
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/playlist_list', function(req, res) {
    var query = 'SELECT count(music_id), playlist_title FROM playlist group by playlist_title'

    connection.query(query, function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({"code" : 400, "result": "error ocurred"});
        } else {
            console.log("playlist list success");
            res.json({ "code": 200, "playlist": result });
        }
    });
});

module.exports = router;