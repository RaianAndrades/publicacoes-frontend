
angular.module('app.author')
	.controller('CreateAuthorCtrl', function ($scope, AuthorService, $location, ngToast){

		$scope.publication = {};
		
		AuthorService.getAutores()
			.then(function(data){
				$scope.authorList = data.lista;
				// console.log(data);
			});


		$scope.cadastrarNovoAutor = function(){
			var obj = angular.copy($scope.author);
			console.log(obj);
			
			AuthorService.createAutor(obj)
				.then(function(data){
					obj.id = data.id;
					$scope.authorList.push(obj);
					console.log(obj);
					$scope.authorList = {};
					AuthorService.getAutores()
					$location.path('/autores');
					ngToast.create('Cadastrado com sucesso')
				},
					function(err){
        			 ngToast.create({
					  className: 'danger',
					  content: 'Erro ao inserir a publicação'
					});
        			 console.log(err);
        			}
				);
			}

		$scope.excluirAutor = function(id){
			var obj = angular.copy(id);
			
			AuthorService.excluirAutor(id)
				.then(function(data){
					//$scope.user(id);
					 $scope.apply();
					ngToast.create('Excluído com sucesso')
				});
		}
	
		});