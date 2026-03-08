app.controller('medicineCtrl', function($scope, medicineService, invoiceService, $rootScope){

    $scope.invoiceService = invoiceService;
    $scope.medicines = [];
    $scope.searchText = "";

    $scope.userRole = localStorage.getItem("role") || "";

    $rootScope.$on("userLoggedIn", function(){
        $scope.userRole = localStorage.getItem("role");
    });

    $scope.modalMedicine = {};
    $scope.modalTitle = "";

    function saveMedicinesToStorage(data){
        localStorage.setItem("medicines", JSON.stringify(data));
    }

    function loadMedicines(){
        medicineService.getMedicines().then(function(response){
            $scope.medicines = response.data;

            // save medicines locally for dashboard
            saveMedicinesToStorage($scope.medicines);
        });
    }

    loadMedicines();

    $scope.addToCart = function(medicine){
        invoiceService.addToCart(medicine);
    };

    $scope.openAddMedicine = function(){

        $scope.modalTitle = "Add Medicine";

        $scope.modalMedicine = {
            name: "",
            price: "",
            stock: "",
            image_url: "",
            isNew: true
        };

        const modal = new bootstrap.Modal(document.getElementById("medicineModal"));
        modal.show();
    };

    $scope.openEditMedicine = function(medicine){

        $scope.modalTitle = "Edit Medicine";

        $scope.modalMedicine = angular.copy(medicine);
        $scope.modalMedicine.isNew = false;

        const modal = new bootstrap.Modal(document.getElementById("medicineModal"));
        modal.show();
    };

    $scope.saveMedicine = function(){

        const modalEl = document.getElementById("medicineModal");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);

        const payload = {
            name: $scope.modalMedicine.name,
            price: $scope.modalMedicine.price,
            stock: $scope.modalMedicine.stock,
            image_url: $scope.modalMedicine.image_url
        };

        if($scope.modalMedicine.isNew){

            medicineService.addMedicine(payload)
            .then(function(){

                alert("Medicine added!");
                loadMedicines();
                modalInstance.hide();

            });

        }else{

            medicineService.updateMedicine(
                $scope.modalMedicine.id,
                payload
            ).then(function(){

                alert("Medicine updated!");
                loadMedicines();
                modalInstance.hide();

            });

        }

    };

    $scope.deleteMedicine = function(id){

        if(confirm("Are you sure you want to delete this medicine?")){

            medicineService.deleteMedicine(id)
                .then(function(){

                    alert("Medicine deleted!");
                    loadMedicines();

                })
                .catch(function(err){

                    console.error(err);
                    alert("Failed to delete medicine.");

                });

        }

    };

    $scope.isAdmin = function() {
        return localStorage.getItem("role") === "admin";
    };

    $scope.isUser = function() {
        return localStorage.getItem("role") === "user";
    };

});