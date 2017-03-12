(function(angular){
    'use strict';
    
    function URLFactory(){
        var self = this;

        self.urls = {
            login: '/api/login',
            users: '/api/users',
            tasks: '/api/tasks'
        };

        return self.urls;
    }
    angular.module('todoApp.services').factory('URLFactory',URLFactory);
})(window.angular || (window.angular = {}));