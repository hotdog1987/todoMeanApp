(function(angular){
    'use strict';

    function APIService($resource,$q){
        var self = this;
        
        // GET call
        self.get = function(url,format){
            var deferred = $q.defer();
            self.data = {};

            switch(format){
                case 'object':{
                    $resource(url).get().$promise.then(function(data) {
                        deferred.resolve(data);
                    },function(rejection){
                        deferred.reject(rejection);
                    });  
                }
                break;
                case 'array':{
                    $resource(url).query().$promise.then(function(data) {
                        deferred.resolve(data);
                    },function(rejection){
                        deferred.reject(rejection);
                    });
                }
                break;
            }
            
            return deferred.promise;
        };
        
        // POST call
        self.post = function(url,request){
            var deferred = $q.defer();
            self.data = {};

            $resource(url).save(request).$promise.then(function(data) {
                deferred.resolve(data);
            },function(rejection){
                        deferred.reject(rejection);
                    });
            return deferred.promise;
        };
        
        // PUT call
        self.put = function(url,request){
            var deferred = $q.defer();
            self.data = {};

            $resource(url,null,{'update':{method:'PUT'}}).update(request).$promise.then(function(data) {
                deferred.resolve(data);
            },function(rejection){
                        deferred.reject(rejection);
                    });
            
            return deferred.promise;
        };

        // DELTE call
        self.delete = function(url,queryParam,request){
            var deferred = $q.defer();
            self.data = {};

            $resource(url).delete({id:queryParam}).$promise.then(function(data) {
                deferred.resolve(data);
            },function(rejection){
                        deferred.reject(rejection);
                    });
            
            return deferred.promise;
        };
        
    }
    
    APIService.$inject = ['$resource','$q'];

    angular.module('todoApp.services').service('APIService',APIService);
})(window.angular || (window.angular = {}));