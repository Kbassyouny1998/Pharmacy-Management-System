app.controller("dashboardCtrl", function($scope) {

    $scope.loadDashboard = function(){

        // Load medicines
        let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

        $scope.medicines = medicines.slice(-5).reverse();

        $scope.totalMedicines = medicines.length;

        $scope.lowStock = medicines.filter(function(m){
            return m.stock > 0 && m.stock <= 10;
        }).length;

        $scope.outOfStock = medicines.filter(function(m){
            return m.stock === 0;
        }).length;


        // Users
        let users = JSON.parse(localStorage.getItem("users")) || [];

        $scope.totalCustomers = users.filter(function(u){
            return u.role === "user";
        }).length;

        $scope.totalAdmins = users.filter(function(u){
            return u.role === "admin";
        }).length;


        // Invoices
        let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
        $scope.totalInvoices = invoices.length;

    };

});