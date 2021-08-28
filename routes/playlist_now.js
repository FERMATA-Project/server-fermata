// playlist 테이블에서 "현재" 재생목록 가져오기

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init()
connection.connect();


router.post('/now', function (req, res) {
    var query = "SELECT * FROM music WHERE music_id IN (SELECT music_id FROM playlist WHERE playlist_title = '현재')";

    connection.query(query, function (error, result) {
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
