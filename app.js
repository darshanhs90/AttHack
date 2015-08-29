/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 'use strict';

 var express = require('express'),
 app = express(),
 request = require('request'),
 path = require('path'),
 bluemix = require('./config/bluemix'),
 validator = require('validator'),
 watson = require('watson-developer-cloud'),
 extend = require('util')._extend,
 fs = require('fs');
 var https=require('https');
 var eventbriteAPI = require('node-eventbrite');
 
 var token = 'AGVZGIF2LDBGP33DPEWZ';
 var AlchemyAPI = require('alchemy-api');
 var alchemy = new AlchemyAPI('7b6bf4773c39c9e271f6bd999fea5df5179a6dad'); 
 try {
  var api = eventbriteAPI({
    token: token,
    version : 'v3'
  });
} catch (error) {
    console.log(error.message); // the options are missing, this function throws an error. 
  }

  var Twitter = require('node-twitter');

  var twitterRestClient = new Twitter.RestClient(
    'LmNp3JwAQZnuBr4SQFaM7UZG3',
    'Xps6ziqIhZ0exAPoIAeyqj7myu7L78ZLHQDni67dzD9koJQTAD',
    '151128859-F4Wk8KebqH4ZDwp8tMWY8PkoTQzfiEJrN1t2Knfc',
    'czQre16YZKoC4Csi18gGufu8PxF733aL5VnzbhurlGvHw'
    );


// Bootstrap application settings
require('./config/express')(app);

// if bluemix credentials exists, then override local
var credentials = extend({
  version: 'v1',
  username: 'c2aa9b3e-b48b-407d-af2a-9c11fadf36ba',
  password: 'El3G4xh3Zw0P'
}, bluemix.getServiceCreds('visual_recognition')); // VCAP_SERVICES

// Create the service wrapper
var visualRecognition = watson.visual_recognition(credentials);

// render index page
app.get('/', function(req, res) {
  res.render('index');
});
var filePath='';
var hashData=[];
app.post('/', function(req, res) {

  // Classifiers are 0 = all or a json = {label_groups:['<classifier-name>']}
  var classifier = '0';  // All
  if (classifier !== '0') {
    classifier = JSON.stringify({label_groups:[classifier]});
  }
  filePath=req.files.file.path;
  console.log(req.files);
  var imgFile = fs.createReadStream(req.files.file.path);
  // if (req.files.image) {
  //   // file image
  //   imgFile = fs.createReadStream(req.query.image.path);
  // } else if(req.body.url && validator.isURL(req.body.url)) {
  //   // web image
  //   imgFile = request(req.body.url.split('?')[0]);
  // } else if (req.body.url && req.body.url.indexOf('images') === 0) {
  //   // local image
  //   imgFile = fs.createReadStream(path.join('public',req.body.url));
  // } else {
  //   // malformed url
  //   return res.status(500).json({ error: 'Malformed URL' });
  // }

  var formData = {
    labels_to_check: classifier,
    image_file: imgFile
  };

  visualRecognition.recognize(formData, function(error, result) {
    if (error)
      return res.status(error.error ? error.error.code || 500 : 500).json({ error: error });
    else{
      hashData=result.images[0].labels;
      res.sendFile('public/index.html');
    }
  });
});

app.get('/getLabels',function(req,res){
  res.send(hashData);
  res.end();
});


app.get('/getLocation',function(req,res){
  var lat=33.008080;//33.008080,-96.751585
  var longt=-96.751585;
  var location;
  https.get('https://maps.googleapis.com/maps/api/place/search/json?location=33.008080,-96.751585&radius=100&sensor=true&key=AIzaSyCd7puJZ01KdcVVBHQA1iVDIaH4EtuFSqQ',
    function(response) {
      console.log(response);
      var dta='';
      response.on('data',function(d){
        dta+=d;
      })
      response.on('end',function(){
        console.log(JSON.parse(dta).results);

        location=JSON.parse(dta).results[0].name;
        api.search({"q":location,"sort_by":"date","start_date.keyword":"this_week"}, function (error, data) {
          if (error)
            console.log(error.message);
          else{
            res.send(JSON.stringify(data)); 
            res.end();
        }// Do something with your data! 
      });
      });

    });
});


app.get('/getAlchemy',function(req,res){
  var dta=[];
  for (var i = 0;i<hashData.length;i++){

    alchemy.sentiment(hashData[i].label_name, {}, function(err, response) {
      if (err)
        throw err;
      var sentiment = response.docSentiment;
      dta.push(sentiment);
    });
    if(i==hashData.length-1){
      res.send(dta);
      res.end();
    }
  }
})


app.get('/postImg',function(req,res){
  var status=req.query.status1;
  twitterRestClient.statusesUpdateWithMedia(
  {
    'status': status,
    'media[]': filePath
  },
  function(error, result) {
    if (error)
    {
      console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
      res.end('Error');
    }

    if (result)
    {
      res.send(result);
      res.end();
    }
  });
})













var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
//app.listen(1337,'127.0.0.1');
console.log('listening at:', port);