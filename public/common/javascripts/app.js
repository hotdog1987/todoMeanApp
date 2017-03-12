(function(angular){
    'use strict';

    // callback for the app config
    function AppConfig($stateProvider,$urlRouterProvider){
        $stateProvider
        .state('createUsers',{
            url: '/createUsers',
            templateUrl: '/createUsers/createUsers.tpl.html',
            controller: 'createUserController',
            controllerAs: 'CreateUserOneCtrl'            
        })
        .state('login',{
            url: '/login',
            templateUrl: '/login/login.tpl.html',
            controller: 'loginController',
            controllerAs: 'loginCtrl'
        })
        .state('mainPage',{
            url: '/main',
            templateUrl: '/main/main.tpl.html',
            controller: 'mainController',
            controllerAs: 'mainCtrl'
        })
        .state('addTask',{
            url: '/add-task',
            templateUrl: '/task/add.tpl.html',
            controller: 'addTaskController',
            controllerAs: 'addTaskCtrl'
        })
        .state('viewTasks',{
            url: '/view-tasks',
            templateUrl: '/task/view.tpl.html',
            controller: 'viewTaskController',
            controllerAs: 'viewTaskCtrl'
        });

        $urlRouterProvider.otherwise('/createUsers');

    }
    // inject dependencies for app config
    AppConfig.$inject = ['$stateProvider','$urlRouterProvider'];

    // define the app module
    angular.module('todoApp',
    [
        'ngResource','ui.router',
        'todoApp.controllers', 'todoApp.services'
    ])
    .config(AppConfig);

    angular.module('todoApp.controllers', []);
    angular.module('todoApp.services', []);
})(window.angular || (window.angular = {}));    