app.service('medicineService', function($http){
    const API_URL = "https://ldwvlmougkvgbhuxqiob.supabase.co/rest/v1/medicines"
    const config = {
            headers: {
                "apikey": "sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM",
                "Authorization": "Bearer sb_publishable_7o1SWt97qt_vAfwrXObYzw_H3Ra7TJM",
                "Content-Type": "application/json",
                "Prefer": "return=representation"
            }   
        };
    this.getMedicines = function () {
            return $http.get(API_URL, config);
    };
    this.addMedicine = function(data){
        return $http.post(API_URL, data, config);
    };

    this.updateMedicine = function(id, data){
        return $http.patch(API_URL + "?id=eq." + id, data, config);
    };
    
    this.deleteMedicine = function(id){
        return $http.delete(API_URL + "?id=eq." + id, config);
    };
})