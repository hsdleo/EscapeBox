// create the module and name it scotchApp
//var app = angular.module('app', ['mediaPlayer','ui.router']);
var app = angular.module('app', ['mediaPlayer','ui.router']);

//var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

 $urlRouterProvider.otherwise('/alcatraz');

 $stateProvider
     .state('alcatraz', {
         url: '/alcatraz',
         templateUrl: 'views/alcatraz.html',
         controller: 'homeController'
     })
     .state('about', {
         url: '/about',
         templateUrl: 'views/about.html',
         controller: 'aboutController'
     })
     ;

});