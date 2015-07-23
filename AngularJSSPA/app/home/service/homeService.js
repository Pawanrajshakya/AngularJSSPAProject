home.factory('userAccount', ['$resource', '$localStorage', function ($resource, $localStorage) {
    return {
        registration: $resource('https://rails-api-jwt.herokuapp.com/api/Account/UserInfo', {}, {
            get: {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            },
            'registerUser': {
                method: 'POST',
                url: 'https://rails-api-jwt.herokuapp.com/api/users',
                isArray: false
            }
        }),
        login: $resource('https://rails-api-jwt.herokuapp.com/api/users/sign_in', null, {
            'loginUser': {
                method: 'POST'
            },
            logOut: {
                method: 'POST',
                url: '',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            }
        })
    }
}]);