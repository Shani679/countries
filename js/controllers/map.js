app.controller('Map', ($scope,$http)=>{
	$scope.fields=['Name', 'Flag'];
    $scope.dataToShow;
	$http.get('http://restcountries.eu/rest/v2/all?fields=name;flag').then(response=>{
		$scope.table=response.data;
        $scope.dataToShow=response.data;
	})
    $scope.search=(value)=>{
        if(value.length>1){
            $scope.dataToShow=$scope.table.filter(current=>current.name.indexOf(value.charAt(0).toUpperCase()+value.slice(1))!=-1)
        }else{
            $scope.dataToShow=$scope.table;
        }     
    }
	$scope.showOnMap=(row)=>{
		console.log(row.name)
		$http.get('http://restcountries.eu/rest/v2/all?fields=name;latlng').then(response=>{
			for (var i = 0; i < response.data.length; i++) {
				if(response.data[i].name===row.name){
					var lat=response.data[i].latlng[0];
					var lng=response.data[i].latlng[1];
					show(lat,lng);
				}
			};
		})
	}
	function show(lat,lng){
		const map=new google.maps.Map(document.getElementById("map"), {
		zoom:4,
		center:{lat,lng},
		styles: [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c9323b"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c9323b"
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "-1"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "0"
            },
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9323b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#99282f"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#99282f"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#99282f"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#99282f"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#99282f"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#99282f"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#090228"
            }
        ]
    }
]
	})
		const marker= new google.maps.Marker({
			position:{lat, lng},
			map:map
		})
	}
})