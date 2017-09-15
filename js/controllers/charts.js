app.controller('Charts', ($scope,$http)=>{
	$scope.range=0;
    $scope.range2=0;
	$http.get('/countries/countries.json').then(function(data){
        $scope.dataToShow=data.data;
	})
	$scope.updatePopValue=(value)=>{
		$scope.range=value;
        fetchPie($scope.dataToShow, $scope.range, "population", "container1")
	}
    $scope.updateAreaValue=(value)=>{
        $scope.range2=value;
        fetchPie($scope.dataToShow, $scope.range2, "area", "container2")
    }
})

function fetchPie(arr, range, field, container){
	Highcharts.chart(container, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: field
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: createObjectsArr(arr, range, field)
        }]
    });
}

function createObjectsArr(arr, range, field){
	var result=[];
	for (var i = 0; i < arr.length; i++) {
		if(arr[i][field]<=range){
			result.push({name: arr[i].name, y: arr[i][field]})
		}
	}
	return result;
}