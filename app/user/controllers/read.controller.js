
angular.module('app.user')
	.controller('ReadUserCtrl', function ($scope, UserService, $location, $routeParams){

		var id = $routeParams.id;
		$scope.message = null;
		$scope.visualizarUsuario = visualizarUsuario;

		activate();

		//////////////

		function activate(){
			visualizarUsuario(id);
		}

		function visualizarUsuario(id){
			UserService.getOneUsuario(id)
				.then(function(data){
					$scope.user = data;
				})
				.catch(function(err){
					$scope.message = err.data.error;
					console.log(err);
				});
		}

	
	
		});