
angular.module('app.publication')
	.controller('SearchPublicationCtrl', function ($scope, PubService, $location, ngToast, $routeParams, $http){

		

		$scope.pesquisar = function(pesquisa){

			// Se a pesquisa for vazia
			if (pesquisa == ""){

				// Retira o autocomplete
				$scope.completing = false;

			}else{

				// Pesquisa no banco via AJAX
				$http.get('http://localhost/publicacoes-b/index.php/publicacao/buscar?title=' + pesquisa ).
		        success(function(data) {

					// Coloca o autocomplemento
					$scope.completing = true;	

					// JSON retornado do banco
					$scope.publicacoes = data.lista; 
					console.log(data.lista);    
		        })
		        .
		        error(function(data) {
					// Se deu algum erro, mostro no log do console
					console.log("Ocorreu um erro no banco de dados ao trazer auto-ajuda da home");
		        });		
			}
		};	

		$scope.visualizarPublicacao = function(id){
			var obj = angular.copy(id);
			$location.path('/publicacoes/visualizar/' + obj);
			}


		});

