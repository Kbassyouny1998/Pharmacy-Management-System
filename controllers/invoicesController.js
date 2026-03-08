app.controller('invoicesCtrl', function($scope, invoiceService, $http){

    $scope.userRole = localStorage.getItem("role") || "user"; 
    $scope.selectedInvoiceItems = [];

    function saveInvoicesToStorage(data){
        localStorage.setItem("invoices", JSON.stringify(data));
    }

    function loadInvoices(){
        $http.get(
            "https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/invoices?select=*",
            {
                headers:{
                    "apikey":"sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM",
                    "Authorization":"Bearer sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM"
                }
            }
        ).then(function(res){

            $scope.invoices = res.data;

            // SAVE invoices locally for dashboard
            saveInvoicesToStorage($scope.invoices);

        }).catch(function(err){
            console.error("Error loading invoices:", err);
        });
    }

    if($scope.userRole === "admin"){
        loadInvoices();
    } 
    else {

        $scope.invoiceService = invoiceService;

        $scope.removeItem = function(id){ invoiceService.removeFromCart(id); };
        $scope.increase = function(id){ invoiceService.increaseQuantity(id); };
        $scope.decrease = function(id){ invoiceService.decreaseQuantity(id); };

        $scope.checkout = function(userId) {

            var invoice = invoiceService.checkOut(userId);

            if(!invoice || !invoice.items.length){
                alert("Cart is empty!");
                return;
            }

            var headers = {
                "apikey":"sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM",
                "Authorization":"Bearer sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM",
                "Content-Type":"application/json",
                "Prefer":"return=representation"
            };

            var invoicePayload = {
                user_id: invoice.user_id,
                total: invoice.total,
                date: new Date(invoice.date).toISOString().split('T')[0]
            };

            $http.post(
                "https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/invoices",
                invoicePayload,
                { headers: headers }
            ).then(function(res){

                var invoiceId = res.data[0].id;

                var requests = invoice.items.map(function(item){
                    return $http.post(
                        "https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/invoice_items",
                        {
                            invoice_id: invoiceId,
                            medicine_id: item.id,
                            quantity: item.quantity,
                            price: item.price
                        },
                        { headers: headers }
                    );
                });

                Promise.all(requests)
                .then(function(){

                    alert("Invoice created successfully!");

                    // reload invoices for admin dashboard
                    loadInvoices();

                })
                .catch(function(err){
                    console.error(err);
                    alert("Error saving invoice items");
                });

            }).catch(function(err){
                console.error(err);
                alert("Error creating invoice");
            });
        };

    }

    $scope.viewInvoiceDetails = function(invoiceId){

        var headers = {
            "apikey": "sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM",
            "Authorization": "Bearer sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM"
        };

        $http.get(
            "https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/invoice_items?invoice_id=eq." + invoiceId,
            { headers: headers }
        ).then(function(response){

            var items = response.data;

            $http.get(
                "https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/medicines",
                { headers: headers }
            ).then(function(response2){

                var medicines = response2.data;

                for(var i = 0; i < items.length; i++){

                    var item = items[i];

                    for(var j = 0; j < medicines.length; j++){

                        var medicine = medicines[j];

                        if(Number(item.medicine_id) === Number(medicine.id)){
                            item.medicine_name = medicine.name;
                        }

                    }

                }

                $scope.selectedInvoiceItems = items;

                var modalElement = document.getElementById("invoiceDetailsModal");
                var modal = new bootstrap.Modal(modalElement);
                modal.show();

            });

        });

    };

});