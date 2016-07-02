
angular.module('app.publication')
	.controller('UpdatePublicationCtrl', function ($scope, PubService, $location, $routeParams, $rootScope){

		var id = $routeParams.id;
		$scope.message = null;
		$scope.editarPublicacao = editarPublicacao;
		$scope.publication = [];
		$scope.getPublicaoAutores = getPublicaoAutores;

		activate();


		function activate(){
			//var iduser = $rootScope.usuarioLogado.currentUser.id;
			//if(id === iduser){
				editarPublicacao(id);
				getPublicaoAutores(id);
			//} else {
			//	$location.path('/home');
			//}
		}

		function editarPublicacao(id){
			PubService.getOnePublicacao(id)
				.then(function(data){
					$scope.publication = data;
				})
				.catch(function(err){
					$scope.message = err.data.error;
					console.log(err);
				});
		}


		$scope.editPublicacao = function(){
			var obj = angular.copy($scope.publication);
			
			PubService.updatePublicacao(obj)
				.then(function(data){
					obj.id = data.id;
					console.log(obj);
					$scope.publication = {};
					PubService.getPublicacoes()
					$location.path('/publicacoes')
				});
			}



			$scope.pesquisar = function(pesquisa){

			// Se a pesquisa for vazia
			if (pesquisa == ""){

				// Retira o autocomplete
				$scope.completing = false;

			}else{

				// Pesquisa no banco via AJAX
				$http.get('http://www.kamila.arq.br/trabalhos/publicacoes-b/index.php/Autor/buscar?name=' + pesquisa ).
		        success(function(data) {

					// Coloca o autocomplemento
					$scope.completing = true;	

					// JSON retornado do banco
					$scope.autores = data.lista; 
					console.log(data.lista);    
		        })
		        .
		        error(function(data) {
					// Se deu algum erro, mostro no log do console
					console.log("Ocorreu um erro no banco de dados ao trazer auto-ajuda da home");
		        });		
			}
		};

		$scope.adcaut = function (autor){
			
			var obj = angular.copy(autor);

				  
				  $scope.publication.authors.push(obj);
				  console.log($scope.publication.authors);
				
	            //delete $scope.author;
	        };

	        $scope.delaut = function (id){
	            $scope.publication.authors.splice(id,1);
	    };

		$scope.excluirPublicacao = function(id){
			var obj = angular.copy(id);
			
			PubService.excluirPublicacao(id)
				.then(function(data){
					ngToast.create('Excluído com sucesso');
					//$scope.user(id);
				},
					function(err){
        			 ngToast.create({
					  className: 'danger',
					  content: 'Erro ao excluir a publicação'
					});
        			 console.log(err);
        			}
				);
		}

		function getPublicaoAutores(id){
			PubService.getAutoresPub(id)
				.then(function(data){
					$scope.authors = data.lista;
					console.log($scope.authors);
				})
				.catch(function(err){
					$scope.message = err.data.error;
					console.log(err);
				});
		}



	
		});