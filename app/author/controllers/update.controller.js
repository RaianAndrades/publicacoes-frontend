
angular.module('app.user')
	.controller('UpdateAuthorCtrl', function ($scope, AuthorService, $location, $routeParams){

		var id = $routeParams.id;
		$scope.message = null;
		$scope.editarAutor = editarAutor;
		$scope.author = [];

		activate();


		function activate(){
			editarAutor(id);
		}

		function editarAutor(id){
			AuthorService.getOneAutorEdit(id)
				.then(function(data){
					$scope.author = data;
				})
				.catch(function(err){
					$scope.message = err.data.error;
					console.log(err);
				});
		}


		$scope.editAutor = function(){
			var obj = angular.copy($scope.author);
			
			AuthorService.updateAutor(obj)
				.then(function(data){
					obj.id = data.id;
					console.log(obj);
					$scope.author = {};
					AuthorService.getAutores()
					$location.path('/autores')
				});
			}


	
		});