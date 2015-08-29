'use strict';

var express = require('express'),
app = express(),
request = require('request'),
path = require('path'),
bluemix = require('./bluemix'),
validator = require('validator'),
watson = require('watson-developer-cloud'),
extend = require('util')._extend,
fs = require('fs');

// Bootstrap application settings
//require('./config/express')(app);

// if bluemix credentials exists, then override local
var credentials = extend({
  version: 'v1',
  username: 'cf7fbbd2-0de4-4792-b770-9eda5f7d2edd',
  password: 'U7pz6w4qRZrO'
}, bluemix.getServiceCreds('visual_recognition')); // VCAP_SERVICES

// Create the service wrapper
var visualRecognition = watson.visual_recognition(credentials);

// render index page
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/upload', function(req, res) {

  // Classifiers are 0 = all or a json = {label_groups:['<classifier-name>']}
  var classifier = '0';  // All
  if (classifier !== '0') {
    classifier = JSON.stringify({label_groups:[classifier]});
  }

  var imgFile;
  imgFile = fs.createReadStream('tiger.png');
  /*if (req.files.image) {
    // file image
    imgFile = fs.createReadStream(req.files.image.path);
  } else if(req.body.url && validator.isURL(req.body.url)) {
    // web image
    imgFile = request(req.body.url.split('?')[0]);
  } else if (req.body.url && req.body.url.indexOf('images') === 0) {
    // local image
    imgFile = fs.createReadStream(path.join('public',req.body.url));
  } else {
    // malformed url
    return res.status(500).json({ error: 'Malformed URL' });
  }*/

  var formData = {
    labels_to_check: classifier,
    image_file: imgFile
  };

  visualRecognition.recognize(formData, function(error, result) {
    if (error)
      console.log(error);
    else{
      console.log(result.images [0].labels);
      res.end(result.labels);
    }
  });
});

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port,'127.0.0.1',function(){
  console.log('listening');
});
console.log('listening at:', port);
