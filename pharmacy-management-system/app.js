var app = angular.module("pharmacyApp", ["ngRoute"]);

app.config(function($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "views/login.html",
            controller: "loginCtrl"
        })
        .when("/dashboard", {
            templateUrl: "views/dashboard.html",
            controller: "dashboardCtrl"
        })
        .when("/medicines", {
            templateUrl: "views/medicines.html",
            controller: "medicineCtrl"
        })
        .when("/add-edit-medicine", {
            templateUrl: "views/add-edit-medicine.html",
            controller: "aEMedicineCtrl"
        })
        .when("/customers", {
            templateUrl: "views/customers.html",
            controller: "customerCtrl"
        })
        .when("/add-edit-customer", {
            templateUrl: "views/add-edit-customer.html",
            controller: "aECustomerCtrl"
        })
        .when("/invoices", {
            templateUrl: "views/invoices.html",
            controller: "invoiceCtrl"
        })
        .when("/reports", {
            templateUrl: "views/reports.html",
            controller: "reportCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });

});