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

app.controller('profileCtrl', profileCtrlFn);
profileCtrl.inject = ['$http'];

function profileCtrlFn($http) {
    var vm = this;

    $http({
        method: 'GET',
        url: 'profile/api/jobs'
    }).then(httpSuccess, onError);

    function httpSuccess(response) {
        vm.jobsList = response.data;
    }

    function onError(error) {
        console.log('GET to /api/jobs failed: ', error);
    }
};

// results
app.controller('resultsCtrl', resultsCtrlFn);
resultsCtrl.$inject=['$http'];

function resultsCtrlFn ($http) {
    var vm = this;
    $http({
        method: 'GET',
        url: 'http://api.indeed.com/ads/apisearch?publisher=9447015102421242&q=developer&l=chicago&sort=date&radius=&st=&jt=&start=&limit=25&fromage=30&filter=&latlong=&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json'
    }).then(
        indeedAPISuccess,
        onError
    );

    function indeedAPISuccess(response) {
        vm.jobs = response.data.results;
        console.log('GET request to API successful.');
    }

    function onError(error){
        console.log('GET request to API failed: ', error);
    }
};

/*
 Ben Manning [4:06 PM]
 ```// Simple GET request example:
 $http({
 method: 'GET',
 url: '/someUrl'
 }).then(function successCallback(response) {
 // this callback will be called asynchronously
 // when the response is available
 }, function errorCallback(response) {
 // called asynchronously if an error occurs
 // or server returns response with an error status.
 });```
 */