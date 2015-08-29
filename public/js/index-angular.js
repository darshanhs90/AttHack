var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http,$window) {
    $scope.username='';
    $scope.userfile='';
    $scope.txtarea='Enter Text here';
    $scope.eventList=[];



    $scope.hashList=[];
    $scope.lat='';
    $scope.longt='';



    $scope.getList=function(){



        $http({
            url: 'http://hashrite.mybluemix.net/getLabels',
            method: "GET"
        }).success(function(data, status, headers, config) {
          $scope.hashList=data;
          for (var i = data.length - 1; i >= 0; i--) {
              $scope.a+=data[i].label_name+",";
          };




      });

        $http({
            url: 'http://hashrite.mybluemix.net/getLocation',
            method: "GET"
        }).success(function(data, status, headers, config) {

         $scope.eventList=(data.events);
           //$scope.txtarea=$scope.eventList;
           for (var i = $scope.eventList - 1; i >= 0; i--) {
              $scope.b+=data[i].name+",";
          };


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