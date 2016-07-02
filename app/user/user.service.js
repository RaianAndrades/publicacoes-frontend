'use strict';

angular.module('app.user')
	.factory('UserService', ['$http', function($http){

	var service = {
		getUsuarios: getUsuarios,
		createUsuario: createUsuario,
		excluirUsuario: excluirUsuario,
		getOneUsuario: getOneUsuario,
		getOneUsuarioEdit: getOneUsuarioEdit,
		updateUsuario: updateUsuario,
		getPubUsuarios: getPubUsuarios,
		excluirPublicacao: excluirPublicacao
	};


	function getUsuarios(){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Usuario/getall')
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function getOneUsuario(obj){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Usuario/getone?id=' + obj )
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function getOneUsuarioEdit(obj){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Usuario/getoneedit?id=' + obj )
			.then(function(response){
				return response.data;
			});
		return a;
	}


	function createUsuario(data){
		var a = $http.post('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Usuario/create', data)
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function updateUsuario(data){
		var a = $http.put('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Usuario/update', data)
			.then(function(response){
				return response.data;
			});
		return a;
	}


	function excluirUsuario(obj){
		var a = $http.delete('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Usuario/delete', {data: "id="+obj })
			.then(function(response){
				return response.data;
			});
		return a;
	}


	function getPubUsuarios(obj){
		var a = $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Publicacao/getpubusuario?id=' + obj )
			.then(function(response){
				return response.data;
			});
		return a;
	}

	function excluirPublicacao(obj){
		var a = $http.delete('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Publicacao/delete', {data: "id="+obj })
			.then(function(response){
				return response.data;
			});
		return a;
	}


	return service;
}]);
