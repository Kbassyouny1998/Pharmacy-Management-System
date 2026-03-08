app.controller("loginCtrl", function($scope, $http, $location, $rootScope) {

$scope.loginData = {};
$scope.error = {};

const headers = {
"apikey":"sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM",
"Authorization":"Bearer sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM"
};

$scope.login = function(){

$scope.error = {};

$http.get(
"https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/users?email=eq." 
+ $scope.loginData.email 
+ "&password=eq." 
+ $scope.loginData.password,
{ headers: headers }
).then(function(res){

if(res.data.length === 0){

$scope.error.email = "Invalid email or password";
return;

}

const user = res.data[0];

localStorage.setItem("role", user.role);
localStorage.setItem("username", user.name);

/* store user locally */

let users = JSON.parse(localStorage.getItem("users")) || [];

if(!users.find(u => u.email === user.email)){

users.push(user);
localStorage.setItem("users", JSON.stringify(users));

}

$rootScope.$broadcast("userLoggedIn");

alert("Login successful");

if(user.role === "admin"){

$location.path("/dashboard");

}else{

$location.path("/invoices");

}

});

};

});