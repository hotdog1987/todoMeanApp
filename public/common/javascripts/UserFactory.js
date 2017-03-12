(function(angular){
    'use strict';
    
    function UserFactory(){
        var self = this;

        self.user = null;

        return self;
    }
    angular.module('todoApp.services').factory('UserFactory',UserFactory);
})(window.angular || (window.angular = {}));