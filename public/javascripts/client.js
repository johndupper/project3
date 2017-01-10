// angular app
var app = angular.module('careerCompass', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('profile', {
            url: '/profile',
            templateUrl: '/templates/profile.html',
            controller: 'profileCtrl',
            controllerAs: '$ctrl'
        });
    $stateProvider
        .state('search', {
            url: '/search',
            templateUrl: '/templates/search.html',
            controller: 'searchCtrl',
            controllerAs: '$ctrl'
        });
    $stateProvider
        .state('results', {
            url: '/results',
            templateUrl: '/templates/results.html',
            controller: 'resultsCtrl',
            controllerAs: '$ctrl'
        });
    $urlRouterProvider.otherwise('/profile');
});

/* CONTROLLERS */
app.controller('profileCtrl', function($http) {
    var vm = this;

    $http({
        method: 'GET',
        url: '/api/jobs'
    }).then(httpSuccess, onError);

    function httpSuccess(response) {
        vm.jobsList = response.data;
    }

    function onError(error) {
        console.log('GET to /api/jobs failed: ', error);
    }
});

app.controller('resultsCtrl', function($http) {
    var vm = this;
    vm.indeedResults = [];

    $http({
        method: 'GET',
        url: '/api/results'
    }).then(httpSuccess, onError);

    function httpSuccess(response) {
        vm.indeedResults = response.data.results;
    }

    function onError(error) {
        console.log('GET to /api/jobs failed: ', error);
    }
});
