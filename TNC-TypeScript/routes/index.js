"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
var express = require("express");
var fileUpload = require('express-fileupload');
var router = express.Router();
var app = express();
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
app.post('/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var sampleFile = req.files.sampleFile;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('/somewhere/on/your/server/filename.jpg', function (err) {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map