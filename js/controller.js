app.controller('weatherController', function($scope, $http, Config){



$scope.init = function(){
if(navigator.geolocation){
		var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  $scope.lat = crd.latitude;
  $scope.long = crd.longitude

  console.log('Your current position is:');
  console.log('lat' + $scope.lat)
  console.log('lat' + $scope.long)
  console.log(`More or less ${crd.accuracy} meters.`);
  $scope.getWeather();
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
	}

	else{
		console.log("sorry")
	}
}


$scope.getWeather = function(position){
Config()
		.then(function(config){
			$scope.url = config.data.apiUrl
			// console.log($scope.url)
			if($scope.cityName){
				$scope.query = $scope.url + 'weather?q=' + $scope.cityName + '&&APPID=5562f355df8fce1bb3108f75c8de2889';
				// console.log($scope.query)
			}else{
				// $scope.init();
				$scope.query = $scope.url + 'weather?lat=' + $scope.lat + '&lon=' + $scope.long + '&&APPID=5562f355df8fce1bb3108f75c8de2889';
				// console.log($scope.query)
			}


			$http.get($scope.query).then(function(res){
				$scope.data = res.data;
				$scope.date = new Date();
				console.log($scope.data)

				var getNext = $scope.url + 'forecast?id=' + $scope.data.id + '&&APPID=5562f355df8fce1bb3108f75c8de2889';

				$http.get(getNext)
				.then(function(nextData){
					$scope.nextData = nextData.data.list;
					$scope.getNext = $scope.url + 'forecast/daily?id=' + $scope.data.id + '&&APPID=5562f355df8fce1bb3108f75c8de2889';
					console.log($scope.nextData)

					//get data for next 7 days
					$http.get($scope.getNext)
					.then(function(sevenDays){
						$scope.days = [];
						$scope.minTemp = [];
						$scope.maxTemp = [];
						$scope.sevenDays = sevenDays.data.list;

						
						($scope.sevenDays).forEach(function(item){
							var minimumTemp = (item.temp.min-273.15).toFixed(2);
							var maximumTemp = (item.temp.max-273.15).toFixed(2);
							$scope.days.push(moment.unix(item.dt).format('dddd'));
							$scope.minTemp.push(minimumTemp);
							$scope.maxTemp.push(maximumTemp);
						})
						console.log($scope.days)
						console.log($scope.minTemp)
						console.log($scope.maxTemp)
						


					})

				}).catch(function (err) {
                        console.log(err);
                    })


			}).catch(function (err) {
                        console.log(err);
                    })


		}).catch(function (err) {
                        console.log(err);
                    })

}



})