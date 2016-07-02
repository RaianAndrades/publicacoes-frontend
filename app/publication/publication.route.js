'use strict';

var publicacoes = angular.module('app.publicacoes', ['ngResource']);

angular.module('app.publication')
.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
      $routeProvider
        .when('/publicacoes', {
                templateUrl: 'app/publication/views/listar.html',
                controller: 'ListPublicationCtrl'
        })
        .when('/cadastrar-publicacao', {
                templateUrl: 'app/publication/views/cadastrar.html',
                controller: 'CreatePublicationCtrl'
        })
        .when('/publicacoes/edit/:id', {
                templateUrl: 'app/publication/views/editar.html',
                controller: 'UpdatePublicationCtrl'
        })
        .when('/publicacoes/visualizar/:id', {
                templateUrl: 'app/publication/views/visualizar.html',
                controller: 'ReadPublicationCtrl'
        })
        .when('/publicacoes/visualizar-ano/:id', {
                templateUrl: 'app/publication/views/visualizaryear.html',
                controller: 'YearPublicationCtrl'
        })
        .otherwise({redirectTo: '/'});
    }]);
  



