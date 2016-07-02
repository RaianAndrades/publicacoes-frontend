
angular.module('app.publication')
	.controller('CreatePublicationCtrl', function ($scope, PubService, $location, ngToast, $rootScope, $http){

		$scope.publication = {};
		$scope.publication.authors = [];
		
		PubService.getPublicacoes()
			.then(function(data){
				$scope.publicationList = data.lista;
				// console.log(data);
			});

			$scope.publication.lat = undefined;
		 	$scope.publication.lng = undefined;
		 	$scope.publication.endereco = undefined;
		    $scope.MostrarEndereco;

		  
		    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
		      // $scope.publication.endereco	= $scope.autocomplete;
		       console.log($scope.publication.endereco);
		       var location = $scope.autocomplete.getPlace().geometry.location;
		       //var local - $scope.autocomplete.getPlace().geometry.location;
		       $scope.publication.lat = location.lat();
		       $scope.publication.lng = location.lng();
		       $scope.publication.endereco = $scope.autocomplete.getPlace().formatted_address;

		       console.log($scope.autocomplete.getPlace());
		       $scope.$apply();
		       //MostrarEndereco($scope.lat, $scope.lng); 
		    });	


		$scope.cadastrarNovaPublicacao = function(){
			$scope.publication.iduser = $rootScope.usuarioLogado.currentUser.id;
			$scope.publication.authors = $scope.publication.authors;
			//console.log($scope.publication.iduser);


			var obj = angular.copy($scope.publication);
			//console.log(obj);
			console.log(obj);
			PubService.createPublicacao(obj)
				.then(function(data){
					obj.id = data.id;
					// $scope.publicationList.push(obj);
					$scope.publicationList = {};
					PubService.getPublicacoes()
					$location.path('/publicacoes');
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

		$scope.pesquisar = function(pesquisa){

			// Se a pesquisa for vazia
			if (pesquisa == ""){

				// Retira o autocomplete
				$scope.completing = false;

			}else{

				// Pesquisa no banco via AJAX
				$http.get('http://www.kamila.arq.br/trabalhos/publicacoes-b/index.php/Autor/buscar?name=' + pesquisa ).
		        success(function(data) {

					// Coloca o autocomplemento
					$scope.completing = true;	

					// JSON retornado do banco
					$scope.autores = data.lista; 
					console.log(data.lista);    
		        })
		        .
		        error(function(data) {
					// Se deu algum erro, mostro no log do console
					console.log("Ocorreu um erro no banco de dados ao trazer auto-ajuda da home");
		        });		
			}
		};

		$scope.adcaut = function (autor){
			
			var obj = angular.copy(autor);

				  
				  $scope.publication.authors.push(obj);
				  console.log($scope.publication.authors);
				
	            //delete $scope.author;
	        };

	        $scope.delaut = function (id){
	            $scope.publication.authors.splice(id,1);
	    };

		$scope.excluirPublicacao = function(id){
			var obj = angular.copy(id);
			
			PubService.excluirPublicacao(id)
				.then(function(data){
					ngToast.create('Excluído com sucesso');
					//$scope.user(id);
				},
					function(err){
        			 ngToast.create({
					  className: 'danger',
					  content: 'Erro ao excluir a publicação'
					});
        			 console.log(err);
        			}
				);
		}

		  


// var app = angular.module('app.publication');  
angular.module('app.publication')
.controller('MapaCtrl', function($scope) {
  $scope.business = {"name": "Teste", 
                     "address": "Rua Manoel José Rodrigues, 131",
                     "city": "Três Cachoeiras/RS",
                     "country": {"name": "Brasil"}};
                     
  $scope.completeAddress = $scope.business.address + ", " + $scope.business.city + ", " + $scope.business.country.name;
});

angular.module('app.publication').directive('map', function() {
  	
  	function link(scope, element, attrs) {
  		
  		var center = new google.maps.LatLng(-29.4580127, -49.92484009999998);
  		// console.log("Map directive-->scope.business.name=" + scope.business.name+ "; address=" + scope.business.address + 
  		// 							 "; city=" + scope.business.city + "; country=" + scope.business.country.name + 
  		// 							 "; latitude=" + scope.business.latitude + "; longitude=" + scope.business.longitude);
  		  		
  		
  		// Geocode							 
  		if( (scope.business.latitude == null) || (scope.business.longitude == null) ) {
        	//var geocoder = new google.maps.Geocoder();        	
        	var address = scope.business.address + ", " + scope.business.city + ", " + scope.business.country.name;
        	var geocoder = new google.maps.Geocoder();                        
        	    geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    scope.completeAddress = results[0].formatted_address;
                    center = new google.maps.LatLng(loc.lat(), loc.lng());
                    
                    // configure marker
			        var marker_options = {
			            map: map,
			            position: center
			        };
			        
			        // create marker
			        var marker = new google.maps.Marker(marker_options);
           		} else {
                    alert("Sorry, this search produced no results.");
                }
                                            
           	});            
        }              		        
             
        var map_options = {
            center: center,
      		zoom: 8,
      		mapTypeId: google.maps.MapTypeId.ROADMAP
        };
		        
        // create map
		var map = new google.maps.Map(document.getElementById(attrs.id), map_options);
		
		scope.$watch('selected', function () {            
        	window.setTimeout(function() {                                                  
                google.maps.event.trigger(map, 'resize');
            }, 100);            
	    });  
    
	    };

  	
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: link
    };
})




 /* $scope.lat = undefined;
  $scope.lng = undefined;
  $scope.MostrarEndereco;

  
  $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
      var location = $scope.autocomplete.getPlace().geometry.location;
      $scope.publication.lat = location.lat();
      $scope.publication.lng = location.lng();
     // $scope.publication.endereco = $scope.autocomplete;
      $scope.$apply();
      //MostrarEndereco($scope.lat, $scope.lng);
      
  });*/

 //  activate();

 //  function activate(){
	// 	MostrarEndereco();
	// }

 	$scope.MostrarEndereco = function(lat, lng){ 
  		var objlat = angular.copy(lat);
  		var objlng = angular.copy(lng);
  		
  		var center = new google.maps.LatLng(objlat, objlng);
  		
  		
  					// Geocode							 

                    center = new google.maps.LatLng(objlat, objlng);
                    console.log(objlat);
  					console.log(objlng);
  					var map;
                    // configure marker
			        var marker_options = {
			            map: map,
			            position: center
			        };
			        
			        // create marker
			        var marker = new google.maps.Marker(marker_options);
                    		        
             
        var map_options = {
            center: center,
      		zoom: 8,
      		mapTypeId: google.maps.MapTypeId.ROADMAP
        };
	     };





		

		});










// var app = angular.module('app.publication');

// Controller de busca
/*angular.module('app.publication').controller('SearchCtrl', function($scope, $http){

	$scope.pesquisar = function(pesquisa){

		// Se a pesquisa for vazia
		if (pesquisa == ""){

			// Retira o autocomplete
			$scope.completing = false;

		}else{

			// Pesquisa no banco via AJAX
			$http.get('http://localhost/publicacoes-b/index.php/Autor/buscar?name=' + pesquisa ).
	        success(function(data) {

				// Coloca o autocomplemento
				$scope.completing = true;	

				// JSON retornado do banco
				$scope.autores = data.lista; 
				console.log(data.lista);    
	        })
	        .
	        error(function(data) {
				// Se deu algum erro, mostro no log do console
				console.log("Ocorreu um erro no banco de dados ao trazer auto-ajuda da home");
	        });		
		}
	};
});*/




/*angular.module('app.publication')
.controller('AutoresCtrl', function($scope){

		$scope.authors = [];
		$scope.adcaut = function (autor){
			
			var obj = angular.copy(autor);

				  
				  $scope.authors.push(obj);
				  console.log($scope.authors);
				
	            //delete $scope.author;
	        };

	        $scope.delaut = function (id){
	            $scope.authors.splice(id,1);
	        };
});*/



// angular.module('app.publication')
// .controller('AutoresCtrl', function($scope){

// 		   var vm = this;

// 			var model = {
// 		    authors : [],
// 		    formNovoAutor : {
// 		      id : null,
// 		      naome : null
// 		    }
// 		  };


// 		$scope.adcaut = function (){
// 			//console.log(autor);
// 			var obj = angular.copy(vm.model.formNovoAutor);

// 				 //$scope.authors = [];
			
// 				  vm.model.authors.push(obj);
// 				  //$scope.autor = "";
// 				  console.log(obj);
				
// 	            //delete $scope.author;
// 	        };

// 	        $scope.delaut = function (id){
// 	            $scope.authors.splice(id,1);
// 	        };
// });




angular.module('app.publication').controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

   

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('app.publication').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, PubService, AuthorService, $location, ngToast) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

   $scope.cadastrarNovoAutor = function(){
			var obj = angular.copy($scope.author);
			console.log(obj);
			$scope.authorList = [];

			PubService.createAutor(obj)
				.then(function(data){
					obj.id = data.id;
					$scope.authorList.push(obj);
					console.log(obj);
					$scope.authorList = {};
					AuthorService.getAutores()
					ngToast.create('Autor cadastrado com sucesso');
					$scope.cancel()
				});
			}

});

 