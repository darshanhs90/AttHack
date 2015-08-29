var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http,$window) {
$scope.username='';
$scope.userfile='';

    $scope.checklogin=function(){
        console.log($scope.userfile);
           $http({
            url: 'http://hashrite.mybluemix.net/login',
            method: "POST",
            params:{imagepath:$scope.userfile}
        }).success(function(data, status, headers, config) {
            console.log(data);
            
        });
    }
});