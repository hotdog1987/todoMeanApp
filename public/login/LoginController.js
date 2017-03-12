(function(angular){
    'use strict';
    
    function LoginController(URLFactory,APIService,UserFactory,$state){
        var vm = this;

        vm.init = function(){
            vm.incorrect = false;
            vm.form = {};
            vm.user = {
                username: '',
                password: ''
            };
        };
        vm.init();

        vm.submit = function(user){
            APIService.post(URLFactory.login,user).then(function(resolve){
                UserFactory.user = angular.copy(resolve);
                $state.go('mainPage');
            },function(reject){
                vm.incorrect = true;
            });
        };
    }

    LoginController.$inject = ['URLFactory','APIService','UserFactory','$state'];

    angular.module('todoApp.controllers').controller('loginController',LoginController);
})(window.angular || (window.angular = {}));