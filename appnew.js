/*jshint node:true*/
//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
// This application uses express as it's web server
// for more info, see: http://expressjs.com
var app = require('express')();
var express=require('express');
var server = require('http').Server(app);
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

// create a new express server
app.use(cors());
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
//server.listen(appEnv.port, appEnv.bind, function() {
server.listen(1337, '127.0.0.1', function() {

    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});


app.get('/auth/twitter', function(req, res) {

    oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
        if (error) {
            console.log(error);
            res.send("Authentication Failed!");
        } else {
            xoauth = {
                token: oauth_token,
                token_secret: oauth_token_secret
            };
            console.log(xoauth);
            //res.addHeader("Access-Control-Allow-Origin", "*");
            res.end('https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token)
        }
    });

});


app.get('/auth/twitter/callback', function(req, res, next) {

    if (xoauth) {
        xoauth.verifier = req.query.code; //req.query.oauth_verifier;
        var oauth_data = xoauth;

        oauth.getOAuthAccessToken(
            oauth_data.token,
            oauth_data.token_secret,
            oauth_data.verifier,
            function(error, oauth_access_token, oauth_access_token_secret, results) {
                if (error) {
                    console.log(error);
                    res.end("Authentication Failure!");
                } else {
                    xoauth.access_token = oauth_access_token;
                    xoauth.access_token_secret = oauth_access_token_secret;
                    console.log(results, xoauth);
                    client = new Twitter({
                        consumer_key: 'LmNp3JwAQZnuBr4SQFaM7UZG3',
                        consumer_secret: 'Xps6ziqIhZ0exAPoIAeyqj7myu7L78ZLHQDni67dzD9koJQTAD',
                        access_token_key: oauth_access_token,
                        access_token_secret: oauth_access_token_secret
                    });

                    T = new Twit({
                        consumer_key: 'LmNp3JwAQZnuBr4SQFaM7UZG3',
                        consumer_secret: 'Xps6ziqIhZ0exAPoIAeyqj7myu7L78ZLHQDni67dzD9koJQTAD',
                        access_token: oauth_access_token,
                        access_token_secret: oauth_access_token_secret
                    })
                    tw = new Twitter1({
                        consumer_key: 'LmNp3JwAQZnuBr4SQFaM7UZG3',
                        consumer_secret: 'Xps6ziqIhZ0exAPoIAeyqj7myu7L78ZLHQDni67dzD9koJQTAD',
                        token: oauth_access_token,
                        token_secret: oauth_access_token_secret
                    });
                    console.log('token');
                    console.log(oauth_access_token);
                    console.log('token secret');
                    console.log(oauth_access_token_secret);
                    res.end("Authentication Successful");
                    // res.redirect('/'); // You might actually want to redirect!
                }
            }
        );
    } else {
        res.end("Authentication Failure"); // Redirect to login page
    }

});




app.use('/twitterSentiment', function(reqst, respns) {

    //get companyname from request
    var companyName = reqst.query.companyName;
    client.get('search/tweets', {
        q: companyName
    }, function(error, tweets, response) {

        var length = (tweets.statuses.length);
        console.log(length);
        var total = 0;
        var count = 0;

        (tweets.statuses).forEach(function(e) {
            var text = e.text;

           // console.log('text is ' + text);
            //if(count<15)
            alchemy.sentiment(text, {}, function(err, response) {
                if (err)
                    throw err;
                var sentiment = response.docSentiment;
                console.log('sentiment is ');
                console.log(sentiment);
                //asd=sentiment;
                //res.send(asd);
                //if(!isNaN(sentiment)){
                count = count + 1;
                console.log(count);
                if (typeof(sentiment) !== "undefined") {
                    if (typeof(sentiment.score) !== "undefined") {
                        total = total + parseFloat(sentiment.score);
                        console.log('total is ' + total);
                        if (total > 1 || total < -1)
                            respns.end(total.toString());
                    }
                }
            });
        });

    });
});




app.get('/news',function(req,respns){

 var val=req.query.val;
 var tweet=timeline[val].text.toString();

  alchemy.keywords(tweet, {}, function(err, response) {
        if (err) throw err;

        // See http://www.alchemyapi.com/api/keyword/htmlc.html for format of returned object
        var keywords = response.keywords;
        console.log(keywords);
        if(keywords==undefined||keywords.length>1)
            keywords='Royal challengers Bangalore';
        Bing.news(keywords, {
    top: 10,  // Number of results (max 50) 
    skip: 3,   // Skip first 3 results 
    newssortby: "Date", //Choices are: Date, Relevance 
    newscategory: "rt_Sports" // Choices are: 
                                //   rt_Business 
                                //   rt_Entertainment 
                                //   rt_Health 
                                //   rt_Politics 
                                //   rt_Sports 
                                //   rt_US 
                                //   rt_World 
                                //   rt_ScienceAndTechnology 
  }, function(error, res, body){
   // console.log(body.d.results);
    respns.send(body.d.results);
    respns.end();
  });
        // Do something with data
    });
})

app.get('/images',function(reqst,respns){

Bing.images("Royal challengers Bangalore", {skip: 10}, function(error, res, body){
  console.log(body);
  respns.send(body.d.results);
  respns.end();
});  
});


app.get('/videos',function(reqst,respns){
Bing.web("Royal challengers Bangalore", {
    top: 10,  // Number of results (max 50)
    skip: 3,   // Skip first 3 results
  }, function(error, res, body){
    console.log(body);
    respns.send(body.d.results);
    respns.end();
  });



});



