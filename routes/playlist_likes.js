//좋아요 개수 가져오기
// Author : seungyeon, Last Modified : 2020.08.14

var express = require("express");
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/playlist_likes', function(req, res) {
    var query = 'SELECT * FROM music where likes = 1';

    connection.query(query, function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({"code" : 400, "result": "error ocurred"});
        } else {
            console.log("likes count success");
            res.json({ "code": 200, "music": result });
        }
    });
});

module.exports = router;