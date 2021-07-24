var app = angular.module("MortgageAppl", []);
 
// Controller Part
app.controller("MortgageController", function($scope, $http) {
 
 
    $scope.mortgages = [];
    $scope.mortgageForm = {
        customer: "Пустохин А Е",
		passport: "19 02 730670",
        address: "Карла-Маркса 113 б",
        phon: "89211400904",
        summa: "5000000",
        duration: "10",
        subject: "Квартира на Ленинградской 150",
        supplier: "Агенство Этажи",
        supAddress: "Победы 15",
        inn: "353003514634"
		
		
    };
 
   
    // HTTP POST  
   
    $scope.submitMortgage = function() {
 
        var method = "";
        var url = "";
        method = "POST";
		//здесь необходимо указать нужный URL
        url = 'http://192.168.1.167:8088/mortgage';
        
 
        $http({
            method: method,
            url: url,
            data: angular.toJson($scope.mortgageForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_success, _error);
    };
 
    $scope.createMortgage = function() {
        _clearFormData();
    }
 
    
 
    function _success(res) {
        //_refreshEmployeeData();
		var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
		if ( typeof data.message== "undefined" ) 
			alert("Заявка сохранена.");
		else{
			alert(data.message);
		}
        
		//_clearFormData();
		
    }
 
    function _error(res) {
        var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
        alert("Error: " + status + ":" + data.message);
    }
 
    // Clear the form
    function _clearFormData() {
        $scope.mortgageForm.empName = "";
		customer= "";
		passport= "";
        address = "";
        phon= "";
        summa= "";
        duration= ""; 
        subject= "";
        supplier= "";
        supAddress= "";
        inn= ""
    };
});