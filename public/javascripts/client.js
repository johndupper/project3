// angular app
var app = angular.module('careerCompass', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    // landing
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/templates/home.html',
            controller: 'homeCtrl',
            controllerAs: '$ctrl'
        });

    // signup
    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: '/templates/signup.html',
            controller: 'signupCtrl',
            controllerAs: '$ctrl'
        });

    // login
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/templates/login.html',
            controller: 'loginCtrl',
            controllerAs: '$ctrl'
        });

    // profile page
    $stateProvider
        .state('profile', {
            url: '/profile',
            templateUrl: '/templates/profile.html',
            controller: 'profileCtrl',
            controllerAs: '$ctrl'
        });

    // search page
    $stateProvider
        .state('search', {
            url: '/search',
            templateUrl: '/templates/search.html',
            controller: 'searchCtrl',
            controllerAs: '$ctrl'
        });

    // results page
    $stateProvider
        .state('results', {
            url: '/results',
            templateUrl: '/templates/results.html',
            controller: 'resultsCtrl',
            controllerAs: '$ctrl'
        });

    $urlRouterProvider.otherwise('/');
});


// landing
app.controller('homeCtrl', function() {
    this.title = 'Home';
    console.log('homeController is here');
});

// signup
app.controller('signupCtrl', function() {
    this.title = 'Signup';
    //
    //
    console.log('signupController is here');
});

// login
app.controller('loginCtrl', function() {
    this.title = 'Login';
    console.log('loginController is here');
});

// profile
app.controller('profileCtrl', function($http) {

    this.title = 'Profile';

    var vm = this;
    vm.jobsList = {};

    $http({
        method: 'GET',
        url: 'http://localhost:3000/profile/jobs'
    })
        // success
        .then(function(response) {
            vm.jobsList = response.data;
        console.log('SUCCESS!');
        console.log(response.data);

    },
        //fail
        function() {
        console.log('FAIL');
    });

    console.log('profileController is here');
});

// search
app.controller('searchCtrl', function() {
    this.title = 'Search';
    console.log('searchController is here');
});

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