//최근 재생목록 5개 가져오기
// Author : seungyeon, Last Modified : 2020.08.10

var express = require("express");
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/playlist_lately', function(req, res) {
    var query = 'SELECT * FROM music WHERE NOT play_date is NULL ORDER BY play_date desc limit 0, 5'

    connection.query(query, function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({"code" : 400, "result": "error ocurred"});
        } else {
            console.log("lately playlist success");
            res.json({ "code": 200, "music": result });
        }
    });
});

module.exports = router;