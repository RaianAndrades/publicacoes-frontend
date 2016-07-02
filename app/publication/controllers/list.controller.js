
angular.module('app.publication')
	.controller('ListPublicationCtrl', function ($scope, PubService, $location, ngToast, $routeParams, AuthorService){

		$scope.publication = {};

		var id = $routeParams.id;
		$scope.getPublicaoAutores = getPublicaoAutores;

		activate();

		function activate(){
			getPublicaoAutores(id);
		}


		PubService.getPublicacoes()
			.then(function(data){
				$scope.publicationList = data.lista;
			});

		$scope.excluirPublicacao = function(id){
			var obj = angular.copy(id);
			
			PubService.excluirPublicacao(id)
				.then(function(data){
					//$scope.user(id);
				});
		}

		$scope.visualizarPublicacao = function(id){
			var obj = angular.copy(id);
			$location.path('/publicacoes/visualizar/' + obj);
			}

		$scope.visualizarPublicacaoYear = function(id){
			var obj = angular.copy(id);
			$location.path('/publicacoes/visualizar-ano/' + obj);
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


		AuthorService.getAutoresPubMenu()
			.then(function(data){
				$scope.authorList = data.lista;
				console.log(data.lista);
			});

		PubService.getPublicacoesYear()
			.then(function(data){
				$scope.pubYearList = data.lista;
				console.log(data.lista);
			});	

		$scope.visualizarAutor = function(id){
			var obj = angular.copy(id);
			$location.path('/autores/visualizar/' + obj);
			}	



	     $scope.Autores = function(){
			$location.path('/autores/');
			}

		$scope.ordenar = function(keyname){
        	$scope.sortKey = keyname;
        	$scope.reverse = !$scope.reverse;
   		 }


		});

