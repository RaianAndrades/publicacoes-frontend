(function() {
    'use strict';

    /** 
	* Module 
	*/
	angular.module('lamp.tel', []);

	/**
	* @desc máscara de telefone para input
	* @example <input type="text" ui-tel="" />
	*/

	angular.module('lamp.tel')
		.directive('uiTel', uiTel);

    uiTel.$inject = [];

    /* @ngInject */
    function uiTel() {
        var directive = {
        	require: 'ngModel',
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
        	element.bind('keyup', function () {
                    ctrl.$setViewValue(formatTel(ctrl.$viewValue));
                    ctrl.$render();
            });

            /* Valid cpf */
	        function formatTel(tel) {

	        	if(tel){
	        		//Denner: Tudo que não for número, é eliminado.
			        tel = tel.replace(/[^0-9]+/g, '');

			        /*Denner: 
			        * Se tiver menos que 11 digitos = (00) 0000-0000
			        * Se não = (00) 00000-000
			        */ 
			        if(tel.length < 11){
			            if (tel.length > 0) {
			                tel = "(" + tel.substring(0);
			            }

			            if (tel.length > 3) {
			                tel = tel.substring(0, 3) + ") " + tel.substring(3);
			            }

			            if (tel.length > 9) {
			                tel = tel.substring(0, 9) + "-" + tel.substring(9);
			            }

			            if (tel.length > 14) {
			                tel = tel.substring(0, 14);
			            }
			        }else {
		        			if (tel.length > 0) {
				                tel = "(" + tel.substring(0);
				            }

				            if (tel.length > 3) {
				                tel = tel.substring(0, 3) + ") " + tel.substring(3);
				            }

				            if (tel.length > 10) {
				                tel = tel.substring(0, 10) + "-" + tel.substring(10);
				            }

				            if (tel.length > 15) {
				                tel = tel.substring(0, 15);
				            }
		        	}
	        	}

	        	//Denner: Valida número de dígitos e seta o campo como válido ou inválido.
		        if (tel.length < 14)
		        {
		            ctrl.$setValidity("tel", false);
		        }
		        else
		        {
		            ctrl.$setValidity("tel", true);
		        }

		        return tel;
		    }
        }
    }

})();


