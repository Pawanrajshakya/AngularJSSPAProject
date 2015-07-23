var post = angular.module('post', []);

post.controller('postsCtrl', function ($scope, postApi) {
    $scope.posts = postApi.post.get();
    $scope.delete = function (id) {
        postApi.post.remove({ id: id }).$promise.then(function (data) {
            console.log(data);
            $scope.posts = postApi.post.get();
        }, function (response) {
            console.log(response);
        });
    };
});
