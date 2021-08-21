//리스트에 음악 저장 취소
//Author : seungyeon, Last Modified : 2020.08.21

var express = require("express");
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/playlist_del', function(req, res) {
    var playlist_title = req.body.playlist_title;
    var music_id = req.body.music_id;
    var query = 'DELETE FROM playlist WHERE playlist_title = ? AND music_id = ?'; // playlist 쿼리문

    connection.query(query, [playlist_title, music_id], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({"code" : 400, "result": "error ocurred"});
        } else {
            console.log("cancle playlist success");
            res.json({ "code": 200, "playlist": result });
        }
    });
});

module.exports = router;