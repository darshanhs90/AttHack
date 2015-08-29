
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('7b6bf4773c39c9e271f6bd999fea5df5179a6dad');

alchemy.sentiment("tiger", {}, function(err, response) {
                if (err)
                    throw err;
                var sentiment = response.docSentiment;
                console.log(sentiment);

            });
