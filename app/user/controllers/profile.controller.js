
angular.module('app.user')
	.controller('ProfileUserCtrl', function ($scope, UserService, $location, $routeParams, $rootScope){

		var id = $routeParams.id;
		$scope.message = null;
		$scope.visualizarUsuario = visualizarUsuario;

		activate();

		function activate(){
			var iduser = $rootScope.usuarioLogado.currentUser.id;
			if(id === iduser){
				visualizarUsuario(id);
			} else {
				$location.path('/home');
			}
			getPublicaoUsuario(id);
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

		$scope.visualizarPublicacao = function(id){
			var obj = angular.copy(id);
			$location.path('/publicacoes/visualizar/' + obj);
			}


		function getPublicaoUsuario(id){
			UserService.getPubUsuarios(id)
				.then(function(data){
					$scope.listPubUsuario = data.lista;
					console.log(data.lista);
				})
				.catch(function(err){
					$scope.message = err.data.error;
					console.log(err);
				});
		}

		$scope.excluirPublicacao = function(id){
			var obj = angular.copy(id);
			
			UserService.excluirPublicacao(id)
				.then(function(data){
					//$scope.user(id);
				});
		}


	
	
		});