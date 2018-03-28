var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope',
    '$http', function ($scope, $http) {
        console.log("Hello World from controller");
        var refresh = function () {

            /*$http.get('/contactlist').success(function(response){
                console.log("I got the data I requeted");
                $scope.contactlist = response;*/
            $http.get('/contactlist').then(function (response) {
                $scope.contactlist = response.data;
            });
        };
        
        refresh();
        $scope.addContact = function () {
            console.log("LANDING HERE CHECK CONTACT", $scope.contact);
            $http.post('/contactlist', $scope.contact).then(function (response) {
                console.log(response);
                $scope.deselect();
                refresh();
            });
        };
        $scope.remove = function (id) {
            console.log(id);
            $http.delete('/contactlist/' + id).then(function (response) {
                refresh();
            });
        };
        $scope.edit = function (id) {
            console.log(id);
            $http.get('/contactlist/' + id).then(function (response) {
                $scope.contact = response.data;
            });
        };
        $scope.update = function () {
            console.log($scope.contact._id);
            $http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function (response) {
                $scope.contact = null;
                refresh();                
            });
            
        };
        $scope.deselect = function () {
            console.log("LANDING HERE TO CHECK");
            $scope.contact = null;
        }
    }]);