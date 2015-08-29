var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http,$window) {
$scope.username='';
$scope.pwd='';

    $scope.checklogin=function(){
           $http({
            url: 'https://hashrite.mybluemix.net/login',
            method: "POST",
            params:{imagepath:$scope.userfile}
        }).success(function(data, status, headers, config) {
            console.log(data);
            
        });
    }
});