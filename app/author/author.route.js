'use strict';

var autor = angular.module('app.autor', ['ngResource']);

angular.module('app.author', [
    'ngRoute'
  ]).config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
      $routeProvider
        .when('/autores', {
                templateUrl: 'app/author/views/listar.html',
                controller: 'ListAuthorCtrl'
        })
        .when('/autores/cadastrar-autor', {
                templateUrl: 'app/author/views/cadastrar.html',
                controller: 'CreateAuthorCtrl'
        })
        .when('/autores/edit/:id', {
                templateUrl: 'app/author/views/editar.html',
                controller: 'UpdateAuthorCtrl'
        })
        .when('/autores/visualizar/:id', {
                templateUrl: 'app/author/views/visualizar.html',
                controller: 'ReadAuthorCtrl'
        })
        .otherwise({redirectTo: '/'});
    }]);
  



