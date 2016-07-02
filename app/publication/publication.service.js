'use strict';

angular.module('app.publication')
	.factory('PubService', ['$http', function($http){

	var service = {
		getPublicacoes: getPublicacoes,
		createPublicacao: createPublicacao,
		excluirPublicacao: excluirPublicacao,
		getOnePublicacao: getOnePublicacao,
		createAutor: createAutor,
		updatePublicacao: updatePublicacao,
		getAutoresPub: getAutoresPub,
		getPublicacoesYear: getPublicacoesYear,
		getPubYearList: getPubYearList
	};


	function getPublicacoes(){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Publicacao/getall')
		//var a = $http.get('http://localhost/publicacoes-b/index.php/Publicacao/getall')
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function getPublicacoesYear(){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Publicacao/getall')
		//var a = $http.get('http://localhost/publicacoes-b/index.php/Publicacao/getallyear')
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function getOnePublicacao(obj){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Publicacao/getone?id=' + obj )
		//var a = $http.get('http://localhost/publicacoes-b/index.php/Publicacao/getone?id=' + obj )
			.then(function(response){
				return response.data;
			});
		return a;
	}


	function createPublicacao(data){
		var a = $http.post('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Publicacao/create', data)
		//var a = $http.post('http://localhost/publicacoes-b/index.php/Publicacao/create', data)
			.then(function(response){
				return response.data;
			});
		return a;
	}



	function excluirPublicacao(obj){
		var a = $http.delete('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Publicacao/delete', {data: "id="+obj })
		//var a = $http.delete('http://localhost/publicacoes-b/index.php/Publicacao/delete', {data: "id="+obj })
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function createAutor(data){
		var a = $http.post('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Autor/create', data)
		//var a = $http.post('http://localhost/publicacoes-b/index.php/Autor/create', data)
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function updatePublicacao(data){
		var a = $http.put('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Publicacao/update', data)
		//var a = $http.put('http://localhost/publicacoes-b/index.php/Publicacao/update', data)
			.then(function(response){
				return response.data;
			});
		return a;
	}

	
	function getAutoresPub(obj){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Publicacao/getautorespub?id=' + obj )
		//var a = $http.get('http://localhost/publicacoes-b/index.php/Publicacao/getautorespub?id=' + obj )
			.then(function(response){
				return response.data;
			});
		return a;
	}

	
	function getPubYearList(obj){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Publicacao/getautorespub?id=' + obj )
		//var a = $http.get('http://localhost/publicacoes-b/index.php/Publicacao/getpubyear?ano=' + obj )
			.then(function(response){
				return response.data;
			});
		return a;
	}


	

	return service;
}]);
