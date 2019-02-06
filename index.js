var app = angular.module('climaApp', [ 'n3-pie-chart']);
app.controller('climaCtrl', function($scope, $http) {
  $scope.firstName= "John";
  $scope.lastName= "Doe";
  $scope.options = {thickness: 5, mode: "gauge", total: 100};

  $scope.ahoratemp = [{label: "Temp", value: 0, color: "#5e90e0", suffix: "â„ƒ"}];
  $scope.ahorahumedad = [{label: "Humedad", value: 0, color: "#5e90e0", suffix: "%"}];
  
  $scope.getahora = ()=>{
    $http({
      method: 'GET',
      url: 'https://clima1318.io.gt/api.php?ahora'
    }).then( (response)=>{
      // $scope.ahora = response.data
      //temperature
      //humidity
      $scope.ahoratemp = [{label: "Temperatura", value: response.data.temperature, color: "#5e90e0", suffix: "â„ƒ"}];
      $scope.ahorahumedad = [{label: "Humedad", value: response.data.humidity, color: "#d62728", suffix: "%"}];
      
    })
  }
  $scope.getahora();
  
  
  
});
