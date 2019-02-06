var app = angular.module('climaApp', [ 'n3-pie-chart']);
app.directive('chart', chartDirective);
app.controller('climaCtrl', function($scope, $http) {
 
  $scope.options = {thickness: 5, mode: "gauge", total: 100};

  $scope.ahoratemp = [{label: "Temp", value: 0, color: "#5e90e0", suffix: "℃"}];
  $scope.ahorahumedad = [{label: "Humedad", value: 0, color: "#5e90e0", suffix: "%"}];
  
  $scope.getahora = ()=>{
    $http({
      method: 'GET',
      url: 'https://clima1318.io.gt/api.php?ahora'
    }).then( (response)=>{
      // $scope.ahora = response.data
      //temperature
      //humidity
      $scope.ahoratemp = [{label: "Temperatura", value: response.data.temperature, color: "#5e90e0", suffix: "℃"}];
      $scope.ahorahumedad = [{label: "Humedad", value: response.data.humidity, color: "#d62728", suffix: "%"}];
      
    })
  }
  $scope.getahora();
  
  
 this.$scope = $scope;
    $scope.names = [];
    $scope.temps = [];
    $scope.hums = [];
    $http({
        method: 'GET',
        url: 'https://clima1318.io.gt/api.php?hoy',
    }).then(response => {
        for( let item of response.data){
            $scope.names.push(item.hour24);
            $scope.temps.push(parseInt(item.temperature));
            $scope.hums.push(parseInt(item.humidity));
        }
        $scope.drawGraph($scope.names,$scope.temps)
        $scope.drawGraphHums($scope.names,$scope.hums)
    });
 
 
    $scope.drawGraph = (names,data)=>{
        $scope.chartConfig = {
        xAxis: {
            categories: names,
        },
        title: {
            text: 'Temperatura de las ultimas 24 horas',
        },
        yAxis: { title: { text: 'Temperatura (Celsius)' } },
        tooltip: { valueSuffix: ' ℃' },
        legend: { align: 'center', verticalAlign: 'bottom', borderWidth: 0 },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [
                            1,
                            Highcharts.Color(Highcharts.getOptions().colors[0])
                                .setOpacity(0)
                                .get('rgba'),
                        ],
                    ],
                },
                marker: {
                    radius: 2,
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1,
                    },
                },
                threshold: null,
            },
        },
        series: [
            {
                type: 'area',
                name: 'Temperatura ',
                data: data,
            },
        ],
    };
    }
    
    
    $scope.drawGraphHums = (names,data)=>{
        $scope.chartHum = {
        xAxis: {
            categories: names,
        },
        title: {
            text: 'Indice de humedad del día',
        },
        yAxis: { title: { text: 'Temperatura (Celsius)' } },
        tooltip: { valueSuffix: ' ℃' },
        legend: { align: 'center', verticalAlign: 'bottom', borderWidth: 0 },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [
                            1,
                            Highcharts.Color(Highcharts.getOptions().colors[0])
                                .setOpacity(0)
                                .get('rgba'),
                        ],
                    ],
                },
                marker: {
                    radius: 2,
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1,
                    },
                },
                threshold: null,
            },
        },
        series: [
            {
                type: 'area',
                name: 'Temperatura ',
                data: data,
            },
        ],
    };
    }
  
});
