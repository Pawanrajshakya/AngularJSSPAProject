var home = angular.module('home', []);

home.controller('homeController', function ($scope, userAccount) {
    $scope.userInfo = {};
    $scope.message = 'Your Home Page.';
    //userAccount.registration.get().$promise.then(function (data) {
    //    $scope.userInfo = data;
    //});
});

home.controller('aboutController', function ($scope) {
    $scope.message = 'Your About Page.';
});

home.controller('contactController', function ($scope) {
    $scope.message = 'someonegmail.com';
});

home.controller('userSignIn', function ($scope, $rootScope, userAccount, $location, $localStorage) {

    $scope.isLoggedIn = false;
    $scope.registering = false;
    $scope.message = '';
    $scope.userUser = {
        user: {
            email: 'praj@gmail.com',
            password: 'P@ssw0rd'
        }
    };

    $scope.registerUser = function () {
        $scope.registering = true;

        userAccount.registration.registerUser($scope.userUser, function (data) {
            $scope.userData.confirmPassword = '';
            $scope.message = '... registration successful.';
            $scope.login();
            $scope.registering = false;
        }, function (response) {
            $scope.isLoggedIn = false;
            $scope.message = response.data.Message + '\r\n';
            if (response.data.exceptionMessage)
                $scope.message += response.data.exceptionMessage;
            //validation error
            if (response.data.ModelState) {
                for (var key in response.data.ModelState) {
                    $scope.message += response.data.ModelState[key] + '\r\n';
                }
            }
            $scope.registering = true;
        })
    };

    $scope.login = function () {
        userAccount.login.loginUser($scope.userUser,
          function (data) {
              $scope.message = "";
              $scope.password = "";
              $localStorage.token = data.data.auth_token;
              $localStorage.userName = data.data.email;
              $scope.isLoggedIn = true;
              $location.url('/home');
              $rootScope.$broadcast('user-changed');
              console.log($localStorage.token);
          },
          function (response) {
              $scope.password = "",
                $scope.message = "Login Failed. ";
              $scope.message += response.data.Message + '\r\n';
              if (response.data.exceptionMessage)
                  $scope.message += response.data.exceptionMessage;
              if (response.data.error) {
                  $scope.message += response.data.error;
              }
          })
    };
});

