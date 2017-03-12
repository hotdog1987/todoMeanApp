(function(angular){
    'use strict';

    function CreateUserController(URLFactory,APIService,$timeout,$state){
        var vm = this;

        vm.init = function(){
            vm.exists = false;
            vm.success = false;
            vm.disableBtn = true;
            APIService.get(URLFactory.users+'/UserOne','object').then(
                // resolved promise
                function(resolve){
                    vm.exists = true;
                    $timeout(function(){
                        $state.go('login');
                    },3000);
                },
                function(reject){
                    vm.disableBtn = false;
                });
            vm.createForm = {};
        };
        vm.init();

        vm.createUser = function(){
            var users = [{
                username: 'UserOne',
                name: 'UserOne',
                password: 'UserOne',
                role: 'Admin'
            },{
            username: 'UserTwo',
                name: 'UserTwo',
                password: 'UserTwo',
                role: 'User'
            },{
            username: 'UserThree',
                name: 'UserThree',
                password: 'UserThree',
                role: 'Admin'
            }];
            APIService.post(URLFactory.users,users).then(function(resolve){
                vm.success = true;
                $timeout(function(){
                    $state.go('login');
                },3000);
            });
        };
    }

    CreateUserController.$inject = ['URLFactory','APIService','$timeout','$state'];

    angular.module('todoApp.controllers').controller('createUserController',CreateUserController);
})(window.angular || (window.angular = {}));