angular.module('app.publication')
	.controller('ReadPublicationCtrl', function ($scope, PubService, $location, $routeParams, ngToast){



		var id = $routeParams.id;
		$scope.message = null;
		$scope.visualizarPublicacao = visualizarPublicacao;
		$scope.getPublicaoAutores = getPublicaoAutores;

		activate();

		function activate(){
			visualizarPublicacao(id);
			getPublicaoAutores(id);
		}

		function visualizarPublicacao(id){
			PubService.getOnePublicacao(id)
				.then(function(data){
					$scope.publication = data;
					console.log(data);
				})
				.catch(function(err){
					$scope.message = err.data.error;
					console.log(err);
				});
		}


		$scope.visualizarAutor = function(id){
			var obj = angular.copy(id);
			$location.path('/autores/visualizar/' + obj);
			}



		function getPublicaoAutores(id){
			PubService.getAutoresPub(id)
				.then(function(data){
					$scope.authorListPub = data.lista;
					console.log(data.lista);
				})
				.catch(function(err){
					$scope.message = err.data.error;
					console.log(err);
				});
		}

	
	
		});




	

