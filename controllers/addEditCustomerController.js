app.controller("addEditCustomerCtrl", function($scope, $http) {

    $scope.userRole = localStorage.getItem("role");

    $scope.users = [];
    $scope.modalUser = {};
    $scope.modalTitle = "";

    const headers = {
        "apikey": "sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM",
        "Authorization": "Bearer sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM",
        "Content-Type": "application/json"
    };

    function saveUsersToStorage(data){
        localStorage.setItem("users", JSON.stringify(data));
    }

    $scope.loadUsers = function() {

        if ($scope.userRole !== "admin") return;

        $http.get(
            "https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/users?role=eq.user",
            { headers: headers }
        ).then(function(res) {

            $scope.users = res.data;

            saveUsersToStorage($scope.users);

        }).catch(function(err) {

            console.error("Error loading users:", err);

        });

    };

    $scope.loadUsers();

    $scope.openAddModal = function(){

        if ($scope.userRole !== "admin") return;

        $scope.modalTitle = "Add User";

        $scope.modalUser = {
            name:"",
            email:"",
            password:"",
            role:"user",
            created_at:new Date(),
            isNew:true
        };

        const modal = new bootstrap.Modal(document.getElementById("userModal"));
        modal.show();

    };

    $scope.openEditModal = function(user){

        if ($scope.userRole !== "admin") return;

        $scope.modalTitle = "Edit User";

        $scope.modalUser = angular.copy(user);
        $scope.modalUser.created_at = new Date(user.created_at);
        $scope.modalUser.isNew = false;

        const modal = new bootstrap.Modal(document.getElementById("userModal"));
        modal.show();

    };

    $scope.saveUser = function(){

        if ($scope.userRole !== "admin") return;

        const url = "https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/users";

        const modalEl = document.getElementById("userModal");
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);

        if ($scope.modalUser.isNew){

            const payload = {
                name:$scope.modalUser.name,
                email:$scope.modalUser.email,
                password:$scope.modalUser.password,
                role:$scope.modalUser.role,
                created_at:$scope.modalUser.created_at
            };

            $http.post(url, payload, { headers: headers })
            .then(function(){

                alert("User added!");

                $scope.loadUsers();
                modalInstance.hide();

            });

        }else{

            const payload = {
                name:$scope.modalUser.name,
                email:$scope.modalUser.email,
                password:$scope.modalUser.password,
                role:$scope.modalUser.role,
                created_at:$scope.modalUser.created_at
            };

            $http.patch(url + "?id=eq." + $scope.modalUser.id, payload, { headers: headers })
            .then(function(){

                alert("User updated!");

                $scope.loadUsers();
                modalInstance.hide();

            });

        }

    };

    $scope.deleteUser = function(user){

        if ($scope.userRole !== "admin") return;

        if(!confirm("Are you sure you want to delete this user?"))
            return;

        const url = "https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/users?id=eq." + user.id;

        $http.delete(url, { headers: headers })
        .then(function(){

            alert("User deleted!");

            $scope.loadUsers();

        });

    };

});