
angular.module('app.user')
	.controller('CreateUserCtrl', function ($scope, UserService, $location, ngToast){

		$scope.user = {};
		
		UserService.getUsuarios()
			.then(function(data){
				$scope.userList = data.lista;
				console.log(data);
			});


		$scope.cadastrarNovoUsuario = function(){
			var obj = angular.copy($scope.user);
			
			UserService.createUsuario(obj)
				.then(function(data){
					obj.id = data.id;
					$scope.userList.push(obj);
					console.log(obj);
					$scope.user = {};
					UserService.getUsuarios()
					$location.path('/login')
					ngToast.create('Cadastrado com sucesso');
				},
					function(err){
        			 ngToast.create({
					  className: 'danger',
					  content: 'Erro ao inserir a publicação'
					});
        			 console.log(err);
        			}

				);
			}

		$scope.excluirUsuario = function(id){
			var obj = angular.copy(id);
			
			UserService.excluirUsuario(id)
				.then(function(data){
					//$scope.user(id);
				});
		}
	
		});



(function() {
    'use strict';



	angular.module('app.user')
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


(function() {
    'use strict';


	angular.module('app.user')
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


