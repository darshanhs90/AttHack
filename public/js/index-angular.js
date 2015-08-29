var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http,$window) {
    $scope.username='';
    $scope.userfile='';
    $scope.txtarea='Enter Text here';
    $scope.eventList=[];



    $scope.hashList=[];
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } 
    }
    $scope.lat='';
    $scope.longt='';

    function showPosition(position) {
        $scope.lat=position.coords.latitude ;
        $scope.longt=position.coords.longitude;  
    }

    $scope.getList=function(){
        

        
        $http({
            url: 'http://hashrite.mybluemix.net/getLabels',
            method: "GET"
        }).success(function(data, status, headers, config) {
           $scope.hashList=data;
       });

        $http({
            url: 'http://hashrite.mybluemix.net/getLocation',
            method: "GET",
            params:{lat:$scope.lat,longt:$scope.longt}
        }).success(function(data, status, headers, config) {
           $scope.eventList=data;
       });
    };

    $scope.sendTweet=function(){
        $http({
            url: 'http://hashrite.mybluemix.net/postImg',
            method: "GET",
            params:{status1:$scope.txtarea}
        }).success(function(data, status, headers, config) {
            alert('Tweet sent successfully');
        });
    };






    $scope.addHash=function($val){
        $scope.txtarea+=$scope.hashList[$val].label_name;
    }

    $scope.addEvents=function($val){
        $scope.txtarea+=$scope.eventList[$val].label_name;
    }


});