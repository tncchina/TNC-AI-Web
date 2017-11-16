'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var azure = require('azure-storage');

var routes = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', routes);
app.use('/users', users);
app.use('/photos', photos);

app.post('/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    var blobSvc = azure.createBlobService();
    var filePath = './photos/' + sampleFile.name;

    if (!sampleFile.name.endsWith('.jpg'))
        return res.status(400).send('Please upload photos with .jpg suffix only');

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(filePath, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!' + req.files.sampleFile.name);

        blobSvc.createContainerIfNotExists('mycontainer', { publicAccessLevel: 'blob' }, function (error, result, response) {
            if (!error) {
                // Container exists and allows
                // anonymous read access to blob
                // content and metadata within this container
            }
        });

        blobSvc.createBlockBlobFromLocalFile('mycontainer', sampleFile.name, filePath, function (error, result, response) {
            if (!error) {
                // file uploaded
                console.log("File uploaded to azure");
            } else {
                Console.log("Failed to upload to azure");
            }
        });

    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
