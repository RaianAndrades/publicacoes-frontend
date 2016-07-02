
angular.module('app.user')
	.controller('ListUserCtrl', function ($scope, UserService, $location){

		$scope.user = {};


		UserService.getUsuarios()
			.then(function(data){
				$scope.userList = data.lista;
			});

		$scope.excluirUsuario = function(id){
			var obj = angular.copy(id);
			
			UserService.excluirUsuario(id)
				.then(function(data){
					//$scope.user(id);
					$location.path('/usuarios');
				});
		}	

		$scope.visualizarUsuario = function(id){
			var obj = angular.copy(id);
			$location.path('/usuarios/visualizar/' + obj);
			}

		$scope.editarUsuario = function(id){
			var obj = angular.copy(id);
			$location.path('/usuarios/editar/' + obj);
			}


		});

