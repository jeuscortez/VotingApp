(function(){
   
   var votingapp = angular.module('votingapp',['ngRoute','angular-jwt']);
   
   votingapp.config(function($routeProvider, $locationProvider){
       
       $locationProvider.html5Mode(true);
       
       $routeProvider.when('/main',{
          templateUrl: './templates/main.html',
          controller: 'MainController',
          controllerAs: 'vm'
       });
       
       $routeProvider.when('/login',{
          templateUrl: './templates/login.html',
          controller: 'LoginController',
          controllerAs: 'vm'
       });
       
       $routeProvider.when('/register',{
          templateUrl: './templates/register.html',
          controller: 'RegisterController',
          controllerAs: 'vm'
       });
       
       $routeProvider.when('/polls',{
          templateUrl: './templates/polls.html',
          controller: 'PollsController',
          controllerAs: 'vm'
       });
       
       $routeProvider.when('/polls/:id',{
          templateUrl: './templates/poll.html',
          controller: 'PollController',
          controllerAs: 'vm'
       });
       
       $routeProvider.when('/profile',{
          templateUrl: './templates/profile.html',
          controller: 'ProfileController',
          controllerAs: 'vm'
       });
   });
   
   votingapp.controller('MainController',MainController);
   
   function MainController($location,$window){
       var vm = this;
       vm.title = 'MainController';
   }
   
   votingapp.controller('LoginController',LoginController);
   
   function LoginController($location,$window){
       var vm = this;
       vm.title = "LoginController";
   }
   
   votingapp.controller('RegisterController',RegisterController);
   
   function RegisterController($location,$window){
       var vm = this;
       vm.title = "RegisterController";
   }
   
   votingapp.controller('ProfileController',ProfileController);
   
   function ProfileController($location,$window){
       var vm = this;
       vm.title = 'ProfileController';
   }
   
   votingapp.controller('PollsController',PollsController);
   
   function PollsController($location,$window){
       var vm = this;
       vm.title = 'PollsController';
   }
   
   votingapp.controller('PollController',PollController);
   
   function PollController($location,$window){
       var vm = this;
       vm.title = 'PollController';
   }
   
   
}());