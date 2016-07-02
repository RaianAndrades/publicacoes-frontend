(function() {
    'use strict';

    /** 
	* Module 
	*/
	angular.module('lamp.cpf', []);

	/**
	* @desc máscara de cpf para input
	* @example <input type="text" ui-cpf="" />
	*/

	angular.module('lamp.cpf')
		.directive('uiCpf', uiCpf);

    uiCpf.$inject = [];

    /* @ngInject */
    function uiCpf() {
        var directive = {
        	require: 'ngModel',
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
        	element.bind('keyup', function () {
                    ctrl.$setViewValue(formatCpf(ctrl.$viewValue));
                    ctrl.$render();
            });

            /* Valid cpf */
	        function formatCpf(cpf) {

	        	if(cpf){
	        		//Denner: Tudo que não for número, é eliminado.
			        cpf = cpf.replace(/[^0-9]+/g, '');

		            if (cpf.length > 3) {
		                cpf = cpf.substring(0, 3) + "." + cpf.substring(3);
		            }

		            if (cpf.length > 7) {
		                cpf = cpf.substring(0, 7) + "." + cpf.substring(7);
		            }

		            if (cpf.length > 11) {
		                cpf = cpf.substring(0, 11) + "-" + cpf.substring(11);
		            }

		            if (cpf.length > 14) {
		                cpf = cpf.substring(0, 14);
		            }

			        //Denner: Valida número de dígitos e seta o campo como válido ou inválido.
			        if (cpf.length < 14)
			        {
			            ctrl.$setValidity("cpf", false);
			        }
			        else
			        {
			            ctrl.$setValidity("cpf", true);
			        }

			        return cpf;
	        	}
		        
		    }
        }
    }

})();


