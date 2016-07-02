(function() {
    'use strict';

    /** 
	* Module 
	*/
	angular.module('lamp.authors', []);

	angular.module('lamp.authors')
    	.run(run);

    function run($templateCache){

    	$templateCache
    		.put(
    			'uiAuthors.html',
    			'<div class="col s12 m6 l6">'+
	        	'<h5>Autores</h5>'+
		        '</div>'+
		        '<div class="col s12 m2 offset-m4 l2 offset-l4">'+
		        	'<!-- Modal trigger -->'+
		        	'<a class="btn-floating btn-large waves-effect waves-light green right" href="#author" data-ui-modal="">'+
			        	'<i class="mdi-content-add"></i>'+
			        '</a>'+
			       
					'<div id="author">'+
						'<form name="formauthor" data-ng-submit="adcauthor(formauthor)">'+
						    '<div class="modal-content">'+
						      '<h4>Autores</h4>'+
						      	'<div class="row">'+
								    '<div class="input-field col s12 m4 l4">'+
								    	'<input id="name" name="name" type="text" data-ng-model="author.name" placeholder="Digite aqui" data-ng-required="true" >'+
								    	'<label class="active" for="name">Nome *</label>'+
								    '</div>'+
								    // '<div class="input-field col s12 m12 l12">'+
								    // 	'<textarea id="name" name="name" type="text" class="materialize-textarea" data-ng-model="phone.obs"placeholder="Digite aqui"></textarea>'+
								    // 	'<label class="active" for="name">Observações</label>'+
								    // '</div>'+
					          	'</div>'+
						    '</div>'+
						    '<div class="modal-footer">'+
						    	'<span>* Campos obrigatórios</span>'+
								'<button type="submit" class="modal-action waves-effect btn green modal-close" data-ng-disabled="formauthor.$invalid">Cadastrar</button>'+
								'<button type="button" class="modal-action modal-close waves-effect btn-flat">Cancelar</button>'+
						    '</div>'+
						'</form>'+
					'</div>'+
		        '</div>'+
				// '<div class="col s12 m12 l12">'+
		  //       	'<table class="centered responsive-table" data-ng-show="phones.length">'+
		  //       		'<thead>'+
		  //       			'<tr>'+
		  //       				'<th data-field="typename">Tipo</th>'+
		  //       				'<th data-field="oper">Operadora</th>'+
		  //       				'<th data-field="nameber">Número</th>'+
		  //       				'<th data-field="obs">Observações</th>'+
		  //       				'<th data-field="del"></th>'+
		  //       			'</tr>'+
		  //       		'</thead>'+
		        	
		  //       		'<tbody>'+
		  //       			'<tr data-ng-repeat="item in phones">'+
		  //       				'<td data-ng-if="item.typename==1">Comercial</td>'+
		  //       				'<td data-ng-if="item.typename==2">Celular</td>'+
		  //       				'<td data-ng-if="item.typename==3">Residencial</td>'+
		  //       				'<td data-ng-if="item.oper==1">Vivo</td>'+
		  //       				'<td data-ng-if="item.oper==2">Tim</td>'+
		  //       				'<td data-ng-if="item.oper==3">Oi</td>'+
		  //       				'<td data-ng-if="item.oper==4">Claro</td>'+
		  //       				'<td data-ng-if="item.oper==5">Nextel</td>'+
		  //       				'<td data-ng-if="item.oper==6">Outro</td>'+
		  //       				'<td data-ng-bind="item.nameber"></td>'+
		  //       				'<td data-ng-bind="item.obs | ellipsis:20" data-ng-if="item.obs"></td>'+
		  //       				'<td data-ng-if="!item.obs">-</td>'+
		  //       				'<td><a href="" data-ng-click="deltel($index)"><i class="small mdi-action-highlight-remove red-text"></i></a></td>'+
		  //       			'</tr>'+
		  //       		'</tbody>'+
		  //       	'</table>'+
		  //       	'<p class="center" data-ng-hide="phones.length">Nenhum registro encontrado.</p>'+
		  //       '</div>'
    			);
    }

	/**
	* @desc 
	* @example 
	*/
    angular
        .module('lamp.authors')
        .directive('authors', authors);

    authors.$inject = [];

    /* @ngInject */
    function authors() {

        var directive = {
            link: link,
            templateUrl: 'uiAuthors.html',
            restrict: 'E',
            scope: {
            	phones: '=list'
            }
        };
        return directive;

        function link(scope, element, attrs) {

	        scope.adcauthor = function (form){
	            scope.authors.push(angular.copy(scope.author));
	            delete scope.author;
	            form.$setPristine();
	        };

	        scope.delauthor = function (id){
	            scope.authors.splice(id,1);
	        };
        }
    }

})();