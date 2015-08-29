var Twitter = require('node-twitter');

var twitterRestClient = new Twitter.RestClient(
    'LmNp3JwAQZnuBr4SQFaM7UZG3',
    'Xps6ziqIhZ0exAPoIAeyqj7myu7L78ZLHQDni67dzD9koJQTAD',
    '151128859-F4Wk8KebqH4ZDwp8tMWY8PkoTQzfiEJrN1t2Knfc',
    'czQre16YZKoC4Csi18gGufu8PxF733aL5VnzbhurlGvHw'
);

twitterRestClient.statusesUpdateWithMedia(
    {
        'status': 'Posting a tweet w/ attached media.',
        'media[]': 'tiger.png'
    },
    function(error, result) {
        if (error)
        {
            console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
        }

        if (result)
        {
            console.log(result);
        }
    });