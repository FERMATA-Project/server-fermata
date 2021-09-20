// playlist 테이블에서 ? 재생목록 가져오기
//Author : dayoung, Last Modified : 2020.09.04

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init()
connection.connect();


router.post('/get_playlist', function (req, res) {
    var playlist_title = req.body.playlist_title; // 선택된 재생 목록 이름
    var query = "SELECT * FROM music WHERE music_id IN (SELECT music_id FROM playlist WHERE playlist_title = ?)";

    connection.query(query, [playlist_title], function (error, result) {
        if(error) {
            console.log("error: ", error);
            res.json({"code" : 400, "result": error});
        } 
        else {
            console.log("success: ", result);
            res.json({ "code": 200, "music": result });
        }
    });
    
});
module.exports = router;
