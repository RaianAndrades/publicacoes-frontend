(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngCookies',
            'ngAnimate',
            'angular-loading-bar',
            'ui.utils.masks',
            'ngFileUpload',
            'app.components'
        ]);
})();