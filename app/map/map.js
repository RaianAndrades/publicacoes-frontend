angular.module('myApp', ['directives']);

function MyMapCtrl ($scope) {
	$scope.selected = 'second'; // try to put 'second' here
}

angular.module('directives', []).directive('map', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function($scope, element, attrs) {
            var center = new google.maps.LatLng(50.1, 14.4);
            
            var map_options = {
                zoom: 14,
                center: center,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            };
          
            // create map
            var map = new google.maps.Map(document.getElementById(attrs.id), map_options);
            
            // configure marker
            var marker_options = {
                map: map,
                position: center
            };
            
            // create marker
            var marker = new google.maps.Marker(marker_options);
            
            $scope.$watch('selected', function () {
                
                                                  window.setTimeout(function(){
                                                      
                    google.maps.event.trigger(map, 'resize');
                                                     },100);
                
          });
        }
    }
});

