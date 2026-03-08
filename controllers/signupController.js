app.controller("signupCtrl", function($scope,$http,$location){

    $scope.user = {};
    $scope.confirmPassword = "";
    $scope.errors = {};

    const headers = {
    "apikey":"sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM",
    "Authorization":"Bearer sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM",
    "Content-Type":"application/json"
    };

    $scope.signup = function(){

        $scope.errors = {};

        if(!$scope.user.name)
            $scope.errors.name = "Username required";

        if(!$scope.user.email)
            $scope.errors.email = "Email required";

        if(!$scope.user.password)
            $scope.errors.password = "Password required";

        if($scope.user.password !== $scope.confirmPassword)
            $scope.errors.confirm = "Passwords do not match";

        if(Object.keys($scope.errors).length > 0)
            return;

        $http.get(
            "https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/users?or=(email.eq."+ $scope.user.email +",name.eq."+ $scope.user.name +")",
            {headers:headers}

        ).then(function(res){

            if(res.data.length > 0){

                res.data.forEach(function(u){

                    if(u.email === $scope.user.email)
                    $scope.errors.email = "Email already exists";

                    if(u.name === $scope.user.name)
                    $scope.errors.name = "Username already exists";

                });

                return;
            }

            const newUser = {
                name:$scope.user.name,
                email:$scope.user.email,
                password:$scope.user.password,
                role:"user",
                created_at:new Date()
            };

            $http.post("https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/users",newUser,
                {headers:headers}

            ).then(function(){

                alert("Signup successful. Please login.");

                $location.path("/login");

            });

        });

    };

});