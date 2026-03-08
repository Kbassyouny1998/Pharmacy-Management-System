app.controller("mainCtrl", function($scope, $interval, invoiceService) {

    $scope.searchText = "";
    $scope.invoiceService = invoiceService;

    function loadUser(){
        $scope.userRole = localStorage.getItem("role");
        $scope.userName = localStorage.getItem("username");
        $scope.isLoggedIn = ($scope.userRole !== null);
    }

    // first load
    loadUser();

    // keep checking localStorage for login updates
    $interval(loadUser, 500);

    $scope.logout = function(){

        localStorage.removeItem("role");
        localStorage.removeItem("username");

        loadUser();

        window.location = "#!/login";
    };

});