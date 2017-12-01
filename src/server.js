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



    // Use the mv() method to place the file somewhere on your server

    sampleFile.mv('./src/static/img/' + sampleFile.name, function (err) {

        if (err)

            return res.status(500).send(err);
        let markup = renderToString(<DashboardPage/>);
        res.render('result', { markup , key:sampleFile.name });
        //res.send('File uploaded!');

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
