console.log("entering the app.js function");
(function(){
   var app = angular.module('app',['ngRoute', 'angular-jwt']);
   
   
   
   
   
   
   app.run(function($http,$rootScope,$location,$window){
      
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.localStorage.token;
      
      $rootScope.$on('$routeChangeStart',function(event,nextRoute,currentRoute){
          
          if(nextRoute.access !== undefined && nextRoute.access.restricted === true && !$window.localStorage.token){
              event.preventDefault();
              $location.path('/login');
          }
          
          if($window.localStorage.token && nextRoute.access.restricted === true){
                $http.post('/api/verify',{token:$window.localStorage.token})
                .then(function(response){
                    console.log('Your token is valid');
                },function(err){
                    delete $window.localStorage.token;
                    $location.path('/login');
                });
          }
      });
   });
   
   
   
   
   
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
   
   function LoginController($location,$window,$http){
       var vm = this;
       vm.title = "LoginController";
       
       vm.error = '';
       vm.login = function(){
           if(vm.user){
               $http.post('/api/login',vm.user)
               .then(function(response){
                   //console.log(response);
                   //console.log("Successfully Logged In");
                   
                   $window.localStorage.token = response.data;
                   $location.path('/profile');
               },function(err){
                   vm.error = err;
               })
           }else{
               console.log("No Credentials Supplied");
           }
       }
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
           .then(function(response){
                    ///console.log(response);///
                    $window.localStorage.token = response.data;
                    $location.path('/profile');
           },function(err){
               vm.error = err.data.errmsg;
           });
       }
   }
   
   app.controller('ProfileController',ProfileController);
   
   function ProfileController($location,$window, jwtHelper){
       var vm = this;
       vm.title = 'ProfileController';
       
       vm.user = null;
       var token = $window.localStorage.token;
       var payload = jwtHelper.decodeToken(token).data;
      // console.log(payload);
      if(payload){
          vm.user = payload;
      }
      
      
      vm.logOut = function(){
          
          delete window.localStorage.token;
          vm.user = null;
          $location.path('/login');  
      }
   }
   
   app.controller('PollsController',PollsController);
   
   function PollsController($location,$window){
       var vm = this;
       vm.title = 'PollsController';
       
       vm.poll ={
           options:[],
           name:''
       }
       
       vm.poll.options = [{
           name: '',
           votes: 0
       }];
       
       vm.addOption = function(){
           vm.poll.options.push({
               name:'',
               votes:0
           });
       }
       
       vm.addPoll = function(){
           console.log(vm.poll);
       }
   }
   
   app.controller('PollController',PollController);
   
   function PollController($location,$window){
       var vm = this;
       vm.title = 'PollController';
   }
   
   
}());