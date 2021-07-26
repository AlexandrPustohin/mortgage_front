var app = angular.module("MortgageApplManager", []);
 
// Controller Part
app.controller("MortgageManagerController", function($scope, $http) {
 
 
    $scope.mortgages = [];
    $scope.mortgageForm = {
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
        _creatFormData(mortgage);
		$http({
            method: 'DELETE',
            url: 'http://localhost:8088/mortgage/' + $scope.mortgageForm.id
        }).then(_successDelete, _error);
    };
 
    // In case of edit
    $scope.editMortgage = function(mortgage) {
        method = "PUT";
        url = 'http://localhost:8088/mortgage/';
        _creatFormData(mortgage)		
		
        $http({
            method: method,
            url: url,
            data: angular.toJson($scope.mortgageForm),
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
	function _successDelete(res) {
        _refreshMortgageData();
		var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
		if ( typeof data.message== "undefined" ) 
			alert("Заявка удалена.");
		else{
			alert(data.message);
		}
        
		//_clearFormData();
		
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
		
        $scope.mortgageForm.id = 0;
		customer= "";
		passport= "";
        address = "";
        phon= "";
        summa= 0;
        duration= 0; 
        subject= "";
        supplier= "";
        supAddress= "";
        inn= ""
    };
	
	// Clear the form
    function _creatFormData(mortgage) {
		_clearFormData();
        $scope.mortgageForm.id = mortgage.id;
		$scope.mortgageForm.customer= mortgage.customer;
		$scope.mortgageForm.passport= mortgage.passport;
        $scope.mortgageForm.address = mortgage.address;
        $scope.mortgageForm.phon= mortgage.phon;
        $scope.mortgageForm.summa= mortgage.summa;
        $scope.mortgageForm.duration= mortgage.duration; 
        $scope.mortgageForm.subject= mortgage.subject;
        $scope.mortgageForm.supplier= mortgage.supplier;
        $scope.mortgageForm.supAddress= mortgage.supAddress;
        $scope.mortgageForm.inn= mortgage.inn
    };
});