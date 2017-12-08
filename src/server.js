'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import DashboardPage from './components/ResultDashboard';


// initialize the server and configure support for ejs templates
const app = new Express();
const fileUpload = require('express-fileupload');

var azure = require('azure-storage');
var request = require('request');

app.use(fileUpload());
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// use npm i express-fileupload
app.post('/upload', function (req, res) {

    if (!req.files)
        return res.status(400).send('No files were uploaded.');


    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    let sampleFile = req.files.sampleFile;

    var blobSvc = azure.createBlobService();

    var filePath = './src/static/img/' + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server

    sampleFile.mv(filePath, function (err) {

        if (err)
            return res.status(500).send(err);
        
        blobSvc.createContainerIfNotExists('mycontainer', { publicAccessLevel: 'blob' }, function (error, result, response) {
            if (error) {
              console.log("Container created on AzureBlob")
            }
        });

        var airesult='';
        blobSvc.createBlockBlobFromLocalFile('mycontainer', sampleFile.name, filePath, function (error, result, response) {

            if (!error) {

                // file uploaded
                console.log("File uploaded to azure");
                var headers ={
                  "Prediction-Key" :"14311bb72e51406a85c43f351a91890b",
                  "Content-Type" :"application/x-www-form-urlencoded"
                }

                var photoUrl = 'https://qqq.blob.core.windows.net/mycontainer/' + sampleFile.name;
                var options = {
                  url : 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/124a8097-fce4-4b00-9b4e-8a89c2d32d63/url?iterationId=152a2f03-5840-46b4-acfe-987a8342b47e',
                  method : 'POST',
                  headers: headers,
                  form: {Url: photoUrl}
                }

                console.log('photoUrl: ' + photoUrl);

                request(options, function(err, ress, body){
                  console.log('Requesting:');
                  if (err)
                    console.log('Error, mate');
                  else
                  { 
                    airesult = body;
                    console.log('Body: \n' + body);

                    let markup = renderToString(<DashboardPage/>);
                    res.render('result', { markup , imgname:sampleFile.name, category: airesult});
                  }
                })

            } else {
                Console.log("Failed to upload to azure");
                        let markup = renderToString(<DashboardPage/>);
                    res.render('result', { markup , imgname:sampleFile.name, category: airesult});
            }

        });


    });

});


// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
