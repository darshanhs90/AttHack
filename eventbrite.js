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
 
// api.search({"location.latitude":"","location.longitude":""}, function (error, data) {
//     if (error)
//         console.log(error.message);
//     else
//         console.log(JSON.stringify(data)); // Do something with your data! 
// });


var currentDate=new Date().getDate();
var previousDate=new Date().getDate();
var currentMonth=new Date().getMonth()+1;
var previousMonth=new Date().getMonth()-1;
var year="2015";
var previousTime="T01:01:01Z"
var currentTime="T23:59:59Z"
var previousDateTime=year+"-"+previousMonth+"-"+previousDate+previousTime;
var currentDateTime=year+"-"+currentMonth+"-"+currentDate+currentTime;
console.log(previousDateTime);
console.log(currentDateTime);
//AIzaSyDWUnMGxYQzaDMTJSkH8btb4oJnLVGo178

api.search({"sort_by":"-date","venue.city":"Dallas","start_date.range_start":previousDateTime,"start_date.range_end":currentDateTime}, function (error, data) {
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