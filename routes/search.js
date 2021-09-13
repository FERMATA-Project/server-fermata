// 음악 검색
//Author : Soohyun, Last Modified : 2021.08.09

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init()
connection.connect();

router.post('/search', function (req, res) {
    var search_word = '%' + req.body.search_word + '%';
    var query = 'SELECT * FROM music WHERE music_title LIKE ? OR singer LIKE ?'; // 음악 검색 쿼리문

    connection.query(query, [search_word, search_word], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({"code" : 400, "result": "error ocurred"});
        } else {
            console.log("music search success");
            res.json({ "code": 200, "music": result });
        }
    });
});

module.exports = router;