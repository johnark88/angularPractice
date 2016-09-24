console.log('js');

var myApp = angular.module('myApp', ['ngRoute']);

var allStudents= [];

myApp.controller('newStudent',['$scope', '$http',function($scope,$http){
console.log('NG');
$scope.allStudents = [];
$scope.addNewStudent = function(){
var newStudent ={
  assignment_number: $scope.assignmentNumber,
  student_name: $scope.studentName,
  score: $scope.studentScore,
  date_completed: $scope.completedDate
};//end newStudent object to send

$http({
method: 'POST',
url: '/create',
data: newStudent

}).then(function(response){
  console.log('back from server sir ', response);
});
$scope.allStudents.push(newStudent);

};//end add super hero scope


}]);//end myApp controller


myApp.config(['$routeProvider',function ($routeProvider){
  $routeProvider.
  when ("/home",
    {templateUrl: "partials/home.html",
    controller: "homeController"
  }).
  when ("/getAll",
    {templateUrl: "partials/getAll.html",
    controller: "getAllController"
  }).
  otherwise({
    redirectTo: "/"
  });
}]);
