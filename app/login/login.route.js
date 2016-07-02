'use strict';

angular.module('app.login')
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'app/partials/home.html',
                controller: 'ListaCtrl'
            })
            .when('/teste', {
                templateUrl: 'app/partials/testes.html',
                controller: 'testeController'
            })
            .when('/login', {
                templateUrl: 'app/partials/login.html',
                controller: 'loginController'
            })
            .when('/autores', {
                templateUrl: 'app/author/views/listar.html',
                controller: 'ListAuthorCtrl'
            })
            .when('/acessoNegado', {
                templateUrl: 'app/partials/acessoNegado.html',
                controller: 'acessoNegadoController'
            })
            .otherwise({ redirectTo: '/home'});

})
.controller('pageController', function ($scope, usuariosService, $location) {

    $scope.logout = function(){
        usuariosService.logout();
    }

    $scope.perfil = function(id){
        var obj = angular.copy(id);
        $location.path('/usuarios/perfil/' + obj);
    }

})
.controller('homeController', function ($scope) {

})

.controller('testeController', function ($scope) {

})

/*.controller('livroController', function ($scope, livrosService) {
    $scope.livros = livrosService.getLivros();
    
})*/

.controller('loginController', function ($scope, $location, usuariosService) {

    $scope.logar = function(){
       // console.log(user);
       var obj = angular.copy($scope.user);
        usuariosService.validaLogin(obj);
        // $location.path('/home');  
        /*if(obj){
            $location.path('/home');  
        } else {
            $location.path('/login');  
        }*/
    }
})

.controller('usuariosController', function ($scope, usuariosService, $location) {
    $scope.usuarios = usuariosService.getUsers();
    
})
.controller('acessoNegadoController', function ($scope) {
    
})


// Controller principal
.controller('ListaCtrl', function($scope, $http, $location){

    // $scope.listarPublicacoes = function(){

            // Busca no banco via AJAX
            $http.get('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Publicacao/getall').
            success(function(data) {

               
                $scope.completing = true;   

                // JSON retornado do banco
                $scope.publicacoes = data.lista; 
                console.log(data.lista);    
            })
            .
            error(function(data) {
                // Se deu algum erro, mostro no log do console
                console.log("Nenhuma publicacão cadastrada");
            });     
    // };

    $scope.visualizarPublicacao = function(id){
            var obj = angular.copy(id);
            $location.path('/publicacoes/visualizar/' + obj);
            }
})


.service('usuariosService', function ($cookieStore, $rootScope, $location, $http, ngToast) {


    /*Nesta função, vamos fazer o papel de validação que seria feito no backend */
    this.validaLogin = function(user, value){
        $http.post('http://www.kamila.arq.br/projetos/publicacoes-b/index.php/Usuario/Login', user).
            success(function(data) {
                //return data.user;  
                SetCredentials(data);
                $rootScope.usuarioLogado = data.Usuario;
                $location.path('/home');
                ngToast.create('Conectado no sistema');
                console.log($rootScope.usuarioLogado);
            })
            .
            error(function(data) {
                // Se deu algum erro, mostro no log do console
                console.log("Usuário não encontrado");

                   ngToast.create({
                      className: 'danger',
                      content: 'Dados incorretos!'
                    });
                 
            }); 
            //console.log(user);
    }

    

    function SetCredentials(response) { 
             var dataUser = response.Usuario;
             console.log(dataUser);
             $rootScope.globals = {
                 currentUser: {
                     id: dataUser.id,
                     name: dataUser.name,
                     email: dataUser.email
                 }
             };
             $cookieStore.put('globals', $rootScope.globals);
         }




    this.logout = function(){
        $rootScope.usuarioLogado = null;
        $cookieStore.remove('globals');
        $location.path('/login')
        ngToast.create({
                      className: 'danger',
                      content: 'Desconectado do sistema'
                    });
    }

})

.run(function ($rootScope, $location) {
    //Rotas que necessitam do login
    var rotasBloqueadasUsuariosNaoLogados = ['usuarios','autores'];
    var rotasBloqueadasUsuariosComuns = ['usuarios'];

    $rootScope.$on('$locationChangeStart', function () { 
        
        if($rootScope.usuarioLogado == null && rotasBloqueadasUsuariosNaoLogados.indexOf($location.path()) != -1){
            $location.path('/acessoNegado');
        }else
        if($rootScope.usuarioLogado != null &&
            rotasBloqueadasUsuariosComuns.indexOf($location.path()) != -1 &&
            $rootScope.usuarioLogado.admin == false){
            $location.path('/acessoNegado')
        }
    });
});