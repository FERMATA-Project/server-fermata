// playlist 테이블에서 특정 재생목록 지우기

var express = require("express");
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/delete', function(req, res){
    var playlist_title = req.body.playlist_title; //플레이리스트 이름

    var query = 'DELETE FROM playlist WHERE playlist_title = ?';

    connection.query(query , [playlist_title], function (error, result) {
        if (error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code" : 400, "result": "error ocurred" })
        } else { // 삭제 성공시
            console.log("deletediary success");
            res.json({ "code": 200, "result": "delete playlist success" });
        }
    });
});

module.exports = router;