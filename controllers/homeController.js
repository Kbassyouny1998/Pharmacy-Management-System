app.controller("homeCtrl", function($scope, $rootScope, $interval){

            
            // Initial role check
            $scope.isAdmin = localStorage.getItem('role') === 'admin';

            // Listen to login events
            $rootScope.$on('userLoggedIn', function() {
                $scope.isAdmin = localStorage.getItem('role') === 'admin';
                $scope.$applyAsync();
            });

            // Polling for manual localStorage change (if user manually changes role)
            $interval(function(){
                $scope.isAdmin = localStorage.getItem('role') === 'admin';
            }, 500);

            $scope.goMedicines = function(){
                window.location.href = "#!/medicines";
            };

            $scope.goCustomers = function(){
                window.location.href = "#!/add-edit-customer";
            };

            $scope.goInvoices = function(){
                window.location.href = "#!/invoices";
            }
        });

