(function(angular){
    'use strict';
    
    function ViewTaskController(URLFactory,APIService,UserFactory,$state,$timeout){
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
                vm.editList = [];
                APIService.get(URLFactory.tasks,'array').then(function(resolve){
                    vm.tasks = angular.copy(resolve);
                    vm.editList.length = vm.tasks.length;
                    for(var i = 0; i < vm.tasks.length; i++){
                        switch(vm.user.username){
                            case 'UserOne':{
                                vm.editList[i] = false;
                            }
                            break;
                            case 'UserTwo':{
                                vm.editList[i] = true;
                            }
                            break;
                            case 'UserThree':{
                                vm.editList[i] = false;
                            }
                            break;
                        }
                    }
                });
            }
        };
        vm.init();

        vm.editTask = function(e,task){
            e.preventDefault();

            var payload = {
                username: vm.user.username,
                task: {
                    taskId: angular.copy(task.taskId),
                    taskTitle: angular.copy(task.taskTitle),
                    taskDesc: angular.copy(task.taskDesc)
                }
            };
            APIService.put(URLFactory.tasks+'/'+task.taskId, payload).then(function(resolveTasks){
                APIService.get(URLFactory.tasks,'array').then(function(resolveList){
                    vm.tasks = angular.copy(resolveList);
                    vm.isSuccess = true;
                    vm.successMessage = angular.copy(resolveTasks.message);
                    $timeout(function(){
                        vm.isSuccess = false;
                    },3000);
                });
            });
        };

        vm.deleteTask = function(e,task){
            e.preventDefault();

            var payload = {
                username: vm.user.username
            };
            APIService.post(URLFactory.tasks+'/'+task.taskId, payload).then(function(resolveTasks){
                APIService.get(URLFactory.tasks,'array').then(function(resolveList){
                    vm.tasks = angular.copy(resolveList);
                    vm.isSuccess = true;
                    vm.successMessage = angular.copy(resolveTasks.message);
                    $timeout(function(){
                        vm.isSuccess = false;
                    },3000);
                });
            });
        };
    }

    ViewTaskController.$inject = ['URLFactory','APIService','UserFactory','$state','$timeout'];

    angular.module('todoApp.controllers').controller('viewTaskController',ViewTaskController);
})(window.angular || (window.angular = {}));