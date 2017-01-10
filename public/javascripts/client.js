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
    // $stateProvider
    //     .state('search', {
    //         url: '/search',
    //         templateUrl: '/templates/search.html',
    //         // controller: 'searchCtrl',
    //         // controllerAs: '$ctrl'
    //     });
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
        console.log('GET failed: ', error);
    }
});






app.service('indeedService', function($http) {
    this.fetchIndeedData = function() {
        return $http({
            method: 'GET',
            url: '/indeed'
        });
    };
});

app.controller('resultsCtrl', function(indeedService) {
    var vm = this;
    vm.indeedData = {};

    indeedService.fetchIndeedData()
        .then(function(response) {
            vm.indeedData = response.data.results;
            console.log(vm.indeedData);
        });
});


    //
    // $http({
    //     method: 'GET',
    //     url: '/indeed'
    // }).then(success, failure);
    //
    // function success(response) {
    //     vm.indeedData = response.data.results;
    //     console.log('success from indeed api', vm.indeedData);
    // }
    // function failure(error) {
    //     console.log('failed from indeed api', error);
    // }



    // vm.indeedResults = [];
    //
    // $http({
    //     method: 'GET',
    //     url: '/api/results'
    // }).then(httpSuccess, onError);
    //
    // function httpSuccess(response) {
    //     vm.indeedResults = response.data.results;
    // }
    //
    // function onError(error) {
    //     console.log('GET to /api/jobs failed: ', error);
    // }
