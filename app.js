var app = angular.module("pharmacyApp", ["ngRoute"]);

app.config(function($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "homeCtrl"
        })
        .when("/dashboard", {
            templateUrl: "views/dashboard.html",
            controller: "dashboardCtrl"
        })
        .when("/medicines", {
            templateUrl: "views/medicines.html",
            controller: "medicineCtrl"
        })
        .when("/home", {
            templateUrl: "views/home.html",
            controller: "homeCtrl"
        })
        .when("/add-edit-customer", {
            templateUrl: "views/add-edit-customers.html",
            controller: "addEditCustomerCtrl"
        })
        .when("/invoices", {
            templateUrl: "views/invoices.html",
            controller: "invoicesCtrl"
        })
        .when("/signup",{
            templateUrl:"views/signup.html",
            controller:"signupCtrl"
        })

        .when("/login",{
            templateUrl:"views/login.html",
            controller:"loginCtrl"
        })
        .otherwise({
            redirectTo: "/home"
        });

});

/*
invoices.html
medicines.html
add-edit-customer.html
signup.html
*/