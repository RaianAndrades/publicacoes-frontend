(function() {
    'use strict';

    angular
        .module('app.publicacoes')
        .run(Run);

    Run.$inject = ['$rootScope', '$location', '$cookieStore'];    

    function Run($rootScope, $location, $cookieStore){
        /*
        * Get cookie credentials
        */
        $rootScope.usuarioLogado = $cookieStore.get('globals') || {};
        
        if (!$rootScope.usuarioLogado.currentUser) {
            // Add header
            $location.path('/login');
        }
    }
})();