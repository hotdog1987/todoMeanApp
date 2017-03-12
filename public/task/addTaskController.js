(function(angular){
    'use strict';
    
    function AddTaskController(URLFactory,APIService,UserFactory,$state,$timeout){
        var vm = this;

        vm.init = function(){
            if(UserFactory.user === null){
                $state.go('login');
            }
            else{
                vm.isSuccess = false;
                vm.successMessage = null;
                vm.user = angular.copy(UserFactory.user);
                vm.form = {};
                vm.task = {
                    title: '',
                    description: ''
                };
                vm.master = angular.copy(vm.task);
            }
        };
        vm.init();

        vm.submit = function(task){
            var payload = {
                username: vm.user.username,
                task: {
                    taskTitle: angular.copy(vm.task.title),
                    taskDesc: angular.copy(vm.task.description)
                }
            };
            APIService.post(URLFactory.tasks, payload).then(function(resolve){
                vm.task = angular.copy(vm.master);
                vm.isSuccess = true;
                vm.successMessage = angular.copy(resolve.message);
                $timeout(function(){
                    vm.isSuccess = false;
                },3000);
            });
        };
    }

    AddTaskController.$inject = ['URLFactory','APIService','UserFactory','$state','$timeout'];

    angular.module('todoApp.controllers').controller('addTaskController',AddTaskController);
})(window.angular || (window.angular = {}));