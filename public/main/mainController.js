(function(angular){
    'use strict';
    
    function MainController(URLFactory,APIService,UserFactory,$state){
        var vm = this;

        vm.init = function(){
            if(UserFactory.user === null){
                $state.go('login');
            }
            else{
                vm.user = angular.copy(UserFactory.user);
                vm.isAdmin = (vm.user.role === 'Admin') ? true : false;
                vm.role = {
                    UserTwo: 'User',
                    UserThree: 'Admin'
                };
            }
        };
        vm.init();
    }

    MainController.$inject = ['URLFactory','APIService','UserFactory','$state'];

    angular.module('todoApp.controllers').controller('mainController',MainController);
})(window.angular || (window.angular = {}));