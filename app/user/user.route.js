'use strict';

var publicacoes = angular.module('app.publicacoes', ['ngResource']);

angular.module('app.user', [
    'ngRoute'
  ]).config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
      $routeProvider
       .when('/', {
                templateUrl: 'app/partials/home.html',
                controller: 'ListaCtrl'
            })
        .when('/usuarios', {
                templateUrl: 'app/user/views/listar.html',
                controller: 'ListUserCtrl'
        })
        .when('/cadastrar-usuario', {
                templateUrl: 'app/user/views/cadastrar.html',
                controller: 'CreateUserCtrl'
        })
       /* .when('/usuarios/edit/:id', {
                templateUrl: 'app/user/views/editar.html',
                controller: 'ListUserCtrl'
        })*/
        .when('/usuarios/visualizar/:id', {
                templateUrl: 'app/user/views/visualizar.html',
                controller: 'ReadUserCtrl'
        })
        .when('/usuarios/editar/:id', {
                templateUrl: 'app/user/views/editar.html',
                controller: 'UpdateUserCtrl'
        })
        .when('/usuarios/perfil/:id', {
                templateUrl: 'app/user/views/perfil.html',
                controller: 'ProfileUserCtrl'
        })
        .otherwise({redirectTo: '/'});
    }]);
  
