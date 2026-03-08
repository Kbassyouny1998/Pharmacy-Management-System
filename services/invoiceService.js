app.service('invoiceService', function(){

    this.cart = [];
    this.invoices = [];


    this.currentUserId = 1;  
    this.addToCart = function(medicine){

        var exists = this.cart.find(function(item){
            return item.id === medicine.id
        });

        if(exists){
            exists.quantity++;
        }else{
            this.cart.push({
                id: medicine.id,
                name: medicine.name,
                price: medicine.price,
                quantity: 1
            });
        }
    };

    this.removeFromCart = function(id){

        for(let i = 0; i < this.cart.length; i++){

            if(this.cart[i].id === id){
                this.cart.splice(i,1);
                break;
            }

        }
    };

    this.getCart = function(){
        return this.cart;
    };

    this.getCartCount = function(){

        let totalQuantity= 0;

        for(let i = 0; i < this.cart.length; i++){
            totalQuantity += this.cart[i].quantity;
        }

        return totalQuantity;
    };

    this.getTotalPrice = function(){

        let totalPrice = 0;

        for(let i = 0; i < this.cart.length; i++){
            totalPrice += this.cart[i].price * this.cart[i].quantity;
        }

        return totalPrice;
    };

    this.clearCart = function(){
        this.cart = [];
    };

    this.checkOut = function(userId){
        let invoice = {};

        invoice.id = Date.now();
        invoice.user_id = userId;
        invoice.items = angular.copy(this.cart);
        invoice.total = this.getTotalPrice();
        invoice.date = new Date();

        this.invoices.push(invoice);

        this.cart = [];

        return invoice;
    };

    this.increaseQuantity = function(id){
        for(let i=0; i<this.cart.length; i++){
            if(this.cart[i].id === id){
                this.cart[i].quantity++;
                break;
            }
        }
    };

    this.decreaseQuantity = function(id){
        for(let i=0; i<this.cart.length; i++){
            if(this.cart[i].id === id){
                if(this.cart[i].quantity > 1){
                    this.cart[i].quantity--;
                } else {
                    this.cart.splice(i,1);
                }
                break;
            }
        }
    };

});