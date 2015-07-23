post.factory('postApi', ['$resource', '$localStorage', function ($resource, $localStorage) {
    return {
        post: $resource('https://rails-api-jwt.herokuapp.com/api/posts', {}, {
            get: {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            },
            remove: {
                method: 'DELETE',
                url: 'https://rails-api-jwt.herokuapp.com/api/posts/:id',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            }
        })
    }
}]);