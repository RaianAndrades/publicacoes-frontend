angular.module('app.publication')
	.controller('YearPublicationCtrl', function ($scope, PubService, $location, $routeParams, ngToast){



		var id = $routeParams.id;
		$scope.message = null;
		$scope.getPublicacaoYearList = getPublicacaoYearList;

		activate();

		function activate(){
			//visualizarPublicacao(id);
			getPublicacaoYearList(id);
		}


		$scope.visualizarPublicacao = function(id){
			var obj = angular.copy(id);
			$location.path('/publicacoes/visualizar/' + obj);
			}



		function getPublicacaoYearList(id){
			PubService.getPubYearList(id)
				.then(function(data){
					$scope.ListPubYear = data.lista;
					console.log(data.lista);
				})
				.catch(function(err){
					$scope.message = err.data.error;
					console.log(err);
				});
		}

	
	
		});




	

