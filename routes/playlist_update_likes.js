// 좋아요한 음악 목록에서 음악 삭제
//Author : Soohyun, Last Modified : 2021.09.14

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init()
connection.connect();

router.post('/updateLikes', function (req, res) {
    var music_id = req.body.music_id; // 음악 아이디
    var query = 'UPDATE music SET likes = 0 WHERE music_id = ?'; // 좋아요 상태 변경 쿼리문

    // music_id 가  문자열로 들어온 경우
    if(typeof music_id == 'string') {
        music_id = [music_id];
    }

    for(var i=0; i<music_id.length; i++) {
        connection.query(query, music_id[i], function (error, result) {
            if(error) { // 에러 발생시
                console.log("error ocurred: ", error);
                res.json({"code" : 400, "result": "error ocurred"});
            } 
        });

        if(i == music_id.length - 1) {
            console.log("likePlaylist delete music success");
            res.json({ "code": 200, "result": "likePlaylist delete music success"});
        }
    }
});

module.exports = router;