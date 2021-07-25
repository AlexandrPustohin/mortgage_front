var app = angular.module("MortgageApplManager", []);
 
// Controller Part
app.controller("MortgageManagerController", function($scope, $http) {
 
 
    $scope.mortgages = [];
    $scope.mortgage = {
		id:0,
        customer: "",
		passport: "",
        address: "",
        phon: "",
        summa: 0,
        duration: 0,
        subject: "",
        supplier: "",
        supAddress: "",
        inn: ""
		
		
    };
	
	_refreshMortgageData();
	
	
	// HTTP DELETE- delete mortgage by Id
	// 
    $scope.deleteMortgage = function(mortgage) {
        $http({
            method: 'DELETE',
            url: '/mortgage/' + mortgage.id
        }).then(_success, _error);
    };
 
    // In case of edit
    $scope.editMortgage = function(mortgage) {
        method = "PUT";
        url = 'http://localhost:8088/mortgage/';
        console.log($scope.mortage);		
		
        $http({
            method: method,
            url: url,
            data: angular.toJson($scope.mortgage),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_success, _error);
    };
 
    // Private Method  
    // HTTP GET- get all employees collection
    // Call: http://localhost:8080/employees
    function _refreshMortgageData() {
        $http({
            method: 'GET',
            url: 'http://localhost:8088/mortgage'
        }).then(
            function(res) { // success
                $scope.mortgages = res.data;
				
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }
	
	
	
    function _success(res) {
        _refreshMortgageData();
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