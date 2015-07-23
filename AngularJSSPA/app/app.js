var myApp = angular.module('myApp', ['home', 'ngResource', 'ngRoute', 'ngStorage', 'post']);

myApp.controller('mainController', function () {

});


myApp.config(function ($routeProvider) {
    $routeProvider

    // route for the home page
      .when('/', {
          templateUrl: 'app/posts/template/post.html',
          controller: 'postsCtrl'
      })

    .when('/signIn', {
        templateUrl: 'app/home/template/signIn.html',
        controller: 'userSignIn'
    })

    .when('/home', {
        templateUrl: 'app/home/template/home.html',
        constroller: 'homeController'
    })

    // route for the about page
    .when('/about', {
        templateUrl: 'app/home/template/about.html',
        controller: 'aboutController'
    })

    // route for the contact page
    .when('/contact', {
        templateUrl: 'app/home/template/contact.html',
        controller: 'contactController'
    })

    .when('/post', {
        templateUrl: 'app/posts/template/post.html',
        controller: 'postsCtrl'
    })

    .otherwise({
        redirectTo: '/home'
    });

});

myApp.directive('myHeader', function () {
    return {
        restrict: 'A',
        templateUrl: 'app/home/template/header.html',
        controller: function ($scope, userAccount, $localStorage) {
            $scope.isUserIn = false;
            $scope.loginUserName = '';
            $scope.$on('user-changed', function () {
                $scope.isUserIn = true;
                $scope.loginUserName = $localStorage.userName;
            });

            $scope.logout = function () {
                delete $localStorage.userName;
                delete $localStorage.token;
                $scope.isUserIn = false;
                $scope.loginUserName = '';
            }
        }
    }
});