'use strict';

angular.module('app.author')
	.factory('AuthorService', ['$http', function($http){

	var service = {
		getAutores: getAutores,
		createAutor: createAutor,
		excluirAutor: excluirAutor,
		getOneAutor: getOneAutor,
		getOneAutorEdit: getOneAutorEdit,
		updateAutor: updateAutor,
		getPubAutor: getPubAutor,
		getAutoresPubMenu: getAutoresPubMenu
	};


	function getAutores(){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Autor/getall')
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function getAutoresPubMenu(){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Autor/getAutoresPubMenu')
		//var a = $http.get('http://localhost/publicacoes-b/index.php/Autor/getAutoresPubMenu')
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function getOneAutor(obj){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Autor/getone?id=' + obj )
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function getOneAutorEdit(obj){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Autor/getoneedit?id=' + obj )
			.then(function(response){
				return response.data;
				console.log(data);
			});
		return a;
	}


	function createAutor(data){
		var a = $http.post('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Autor/create', data)
			.then(function(response){
				return response.data;
			});
		return a;
	}



	function excluirAutor(obj){
		var a = $http.delete('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Autor/delete', {data: "id="+obj })
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function updateAutor(data){
		var a = $http.put('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Autor/update', data)
			.then(function(response){
				return response.data;
			});
		return a;
	}

	
	function getPubAutor(id){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Autor/getPubAutor?id=' + id )
			.then(function(response){
				return response.data;
			});
		return a;
	}


	return service;
}]);
