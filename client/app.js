console.log("entering the app.js function");
(function(){
   var app = angular.module('app',['ngRoute', 'angular-jwt']);
   
   app.config(function($routeProvider, $locationProvider){
       
       $locationProvider.html5Mode(true);
       
       $routeProvider.when('/',{
          templateUrl: 'client/templates/main.html',
          controller: 'MainController',
          controllerAs: 'vm',
          access:{
              restricted: false
          }
       });
       
       $routeProvider.when('/login',{
          templateUrl: 'client/templates/login.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          access:{
              restricted: false
          }
       });
       
       $routeProvider.when('/register',{
          templateUrl: 'client/templates/register.html',
          controller: 'RegisterController',
          controllerAs: 'vm',
          access:{
              restricted: false
          }
       });
       
       $routeProvider.when('/polls',{
          templateUrl: 'client/templates/polls.html',
          controller: 'PollsController',
          controllerAs: 'vm',
          access:{
              restricted: false
          }
       });
       
       $routeProvider.when('/polls/:id',{
          templateUrl: 'client/templates/poll.html',
          controller: 'PollController',
          controllerAs: 'vm',
          access:{
              restricted: false
          }
       });
       
       $routeProvider.when('/profile',{
          templateUrl: 'client/templates/profile.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          access:{
              restricted: true
          }
       });
       
       $routeProvider.otherwise({
        redirectTo: '/'
      });
   });
   
   app.controller('MainController',MainController);
   
   function MainController($location,$window){
       var vm = this;
       vm.title = 'MainController';
       console.log("in the main controller");
   }
   
   app.controller('LoginController',LoginController);
   
   function LoginController($location,$window){
       var vm = this;
       vm.title = "LoginController";
   }
   
   app.controller('RegisterController',RegisterController);
   
   function RegisterController($location,$window,$http){
       var vm = this;
       vm.title = "RegisterController";
       
       vm.register = function(){
           if(!vm.user){
               console.log("Invalid Credentials");
               return;
           }
           $http.post('/api/register', vm.user)
           .then(function(request, response){
                    console.log(response);   
           });
       }
   }
   
   app.controller('ProfileController',ProfileController);
   
   function ProfileController($location,$window){
       var vm = this;
       vm.title = 'ProfileController';
   }
   
   app.controller('PollsController',PollsController);
   
   function PollsController($location,$window){
       var vm = this;
       vm.title = 'PollsController';
   }
   
   app.controller('PollController',PollController);
   
   function PollController($location,$window){
       var vm = this;
       vm.title = 'PollController';
   }
   
   
}());