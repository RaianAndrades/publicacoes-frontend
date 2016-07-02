angular.module('app.author')
	.controller('ReadAuthorCtrl', function ($scope, AuthorService, $location, $routeParams){



		var id = $routeParams.id;
		$scope.message = null;
		$scope.visualizarAutor = visualizarAutor;
		$scope.getAutorPublicacoes = getAutorPublicacoes;

		activate();

		function activate(){
			visualizarAutor(id);
			getAutorPublicacoes(id);
		}

		function visualizarAutor(id){
			AuthorService.getOneAutor(id)
				.then(function(data){
					$scope.author = data;

					// $scope.author = 
			  //        {
			  //            id: '1',
			  //            name: 'Raian',
			  //            email: 'raian@teste.com',
			  //            profession: 'designation'
			  //        }

				})
				.catch(function(err){
					$scope.message = err.data.error;
					console.log(err);
				});
		}


		function getAutorPublicacoes(id){
			//var id = $rootScope.usuarioLogado.id;
			AuthorService.getPubAutor(id)
				.then(function(data){
					$scope.authorPubList = data.lista;
					console.log(data.lista);
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


		$scope.visualizarPublicacao = function(id){
			var obj = angular.copy(id);
			$location.path('/publicacoes/visualizar/' + obj);
			}


	
	
		});




	

