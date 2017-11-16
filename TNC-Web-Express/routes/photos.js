'use strict';
var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {

    fs.readdir('./downloads/', function (err, items) {
        console.log(items);

        for (var i = 0; i < items.length; i++) {
            console.log(items[i]);
        }

        res.render('photos', {
            title: 'photos',
            imgurls: items
        });
    });
});

module.exports = router;
