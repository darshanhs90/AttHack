/*jshint node:true*/
//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
// This application uses express as it's web server
// for more info, see: http://expressjs.com
var app = require('express')();
var express=require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ahttp = require('http');
//if (process.env.NODE_ENV !== 'production'){
    var longjohn= require('longjohn');
//}
longjohn.async_trace_limit = -1;  // unlimited
var request = require('request');
var https = require('https');
var cors = require('cors');
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: 'LmNp3JwAQZnuBr4SQFaM7UZG3',
    consumer_secret: 'Xps6ziqIhZ0exAPoIAeyqj7myu7L78ZLHQDni67dzD9koJQTAD',
    access_token_key: '151128859-F4Wk8KebqH4ZDwp8tMWY8PkoTQzfiEJrN1t2Knfc',
    access_token_secret: 'czQre16YZKoC4Csi18gGufu8PxF733aL5VnzbhurlGvHw'
});
var Twitter1 = require('node-tweet-stream'),
tw = new Twitter1({
    consumer_key: 'LmNp3JwAQZnuBr4SQFaM7UZG3',
    consumer_secret: 'Xps6ziqIhZ0exAPoIAeyqj7myu7L78ZLHQDni67dzD9koJQTAD',
    token: '151128859-F4Wk8KebqH4ZDwp8tMWY8PkoTQzfiEJrN1t2Knfc',
    token_secret: 'czQre16YZKoC4Csi18gGufu8PxF733aL5VnzbhurlGvHw'
});
var watson = require('watson-developer-cloud');
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('0554d03cab53ef907d02d27eaea5c2938b471ef1');
var sendgrid = require('sendgrid')('hsdars', 'Password90-');
var accountSid = 'AC07275e4294f1b0d42623c3ec9559911e';
var authToken = '650d049a9bd99323fb899ce4b9e84fcc';
var clientTwilio = require('twilio')(accountSid, authToken);
var Twit = require('twit');
var sanFrancisco = ['-122.75', '36.8', '-121.75', '37.8']
var T = new Twit({
    consumer_key: 'LmNp3JwAQZnuBr4SQFaM7UZG3',
    consumer_secret: 'Xps6ziqIhZ0exAPoIAeyqj7myu7L78ZLHQDni67dzD9koJQTAD',
    access_token: '151128859-F4Wk8KebqH4ZDwp8tMWY8PkoTQzfiEJrN1t2Knfc',
    access_token_secret: 'czQre16YZKoC4Csi18gGufu8PxF733aL5VnzbhurlGvHw'
})

var OAuth = require('oauth').OAuth,
oauth = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "LmNp3JwAQZnuBr4SQFaM7UZG3",
    "Xps6ziqIhZ0exAPoIAeyqj7myu7L78ZLHQDni67dzD9koJQTAD",
    "1.0",
    "oob",
    "HMAC-SHA1"
    );
var xoauth;

var Bing = require('node-bing-api')({
    accKey: "l11l8D4FBj6XkyHh3NzeMINbdY+s19eUoxrRgvgQQgQ"
});

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var fs = require('fs');

// create a new express server
app.use(cors());
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
server.listen(appEnv.port, appEnv.bind, function() {
//server.listen(1337, '127.0.0.1', function() {

    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});


app.post('/upload',function(req,res){
    var data1='';
    req.on('data',function(d){
        data1+=d;
    })


    fs.writeFile("a.txt", data1, function(err) {
        if(err) {
            return console.log(err);
        }
        fs.readFile('a.txt', 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
        }
        console.log(req);
        // console.log(req.query.file);
        res.send(data);
        res.end();
    });

    }); 

});




