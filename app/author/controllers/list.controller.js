
angular.module('app.author')
	.controller('ListAuthorCtrl', function ($scope, AuthorService, $location){

		$scope.author = {};


		AuthorService.getAutores()
			.then(function(data){
				$scope.authorList = data.lista;
				console.log(data.lista);
			});

		$scope.excluirAutor = function(id){
			var obj = angular.copy(id);
			
			AuthorService.excluirAutor(id)
				.then(function(data){
					//$scope.user(id);
				});
		}

		$scope.visualizarAutor = function(id){
			var obj = angular.copy(id);
			$location.path('/autores/visualizar/' + obj);
			}

		$scope.ordenar = function(keyname){
        	$scope.sortKey = keyname;
        	$scope.reverse = !$scope.reverse;
   		 };


		});

