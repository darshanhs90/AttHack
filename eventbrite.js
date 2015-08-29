// var Eventbrite = require('eventbrite');
// var eb_client = Eventbrite({'app_key':"3NRSYZFSURUOTVQ2ZO", 'user_key':"1425955631137063234825"});
// var params = {'city': "San Francisco", 'region': "CA"};

// eb_client.events_search( params, function(err, data){
//     console.log(err);
//     console.log(data);
// });
var eventbriteAPI = require('node-eventbrite');
 
var token = 'AGVZGIF2LDBGP33DPEWZ';
 
try {
    var api = eventbriteAPI({
      token: token,
      version : 'v3'
    });
} catch (error) {
    console.log(error.message); // the options are missing, this function throws an error. 
}
 
//https://maps.googleapis.com/maps/api/place/search/json?location=33.008080,-96.751585&radius=100&sensor=true&key=AIzaSyCd7puJZ01KdcVVBHQA1iVDIaH4EtuFSqQ
api.search({"q":"Plano","sort_by":"date","start_date.keyword":"this_week"}, function (error, data) {
    if (error)
        console.log(error.message);
    else
        console.log(JSON.stringify(data)); // Do something with your data! 
});

// api.event_details({"event_id":"17704053300"}, function (error, data) {
//     if (error)
//         console.log(error.message);
//     else
//         console.log(JSON.stringify(data)); // Do something with your data! 
// });