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
        .state('results', {
            url: '/results',
            templateUrl: '/templates/results.html',
            controller: 'resultsCtrl',
            controllerAs: '$ctrl'
        });

    // ID --> edit here
    $stateProvider
        .state('edit', {
            url: '/edit',
            templateUrl: '/templates/edit.html',
            controller: 'editCtrl',
            controllerAs: '$ctrl'
        });

    // this is the actual search/results controller
    $stateProvider
        .state('test', {
            url: '/test',
            templateUrl: '/templates/test.html',
            controller: 'testCtrl',
            controllerAs: '$ctrl'
        });
    $urlRouterProvider.otherwise('/profile');
});


app.controller('testCtrl', function($http) {
    var vm = this;
    vm.allJobs = {};

    vm.getJobs = function() {
        // console.log(vm.jobString);
        $http({
            method: 'GET',
            url: 'http://api.indeed.com/ads/apisearch?publisher=9447015102421242&q='+vm.jobString+'&l='+vm.locationString+'&sort=date&radius=&st=&jt=&start=&limit=25&fromage=30&filter=&latlong=&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json'
        }).then(
            // success
            function(response) {
                vm.allJobs = response.data.results;
                console.log('getJobs() success, jobs: ', vm.allJobs);
            }, // error
                function(error) {
                console.log('GET to /api/jobs failed: ', error);
            });
        };
});


/* CONTROLLERS */
app.controller('profileCtrl', function($http, $state) {
    var vm = this;

    vm.showInput = false;
    vm.buttonText = 'Edit';

    $http({
        method: 'GET',
        url: '/api/jobs'
    }).then(httpSuccess, onError);
    function httpSuccess(response) {
        console.log('HTTP SUCCESS: ', response);
        vm.jobsList = response.data;
    }
    function onError(error) {
        console.log('GET to /api/jobs failed: ', error);
    }

    vm.toggleInput = function() {
        if (vm.showInput === false) {
            vm.showInput = true;
            vm.buttonText = 'Save';
        } else {
            vm.showInput = false;
            vm.buttonText = 'Edit';
        }
    };

    vm.consoleText = function(text) {
        console.log('consoleText: ', text);
    };

    vm.removeJob = function(jobId) {
        console.log('button works!', jobId);
        $http({
            method: 'DELETE',
            url: 'api/jobs/' + jobId
        }).then(httpSuccess, onError);
        function httpSuccess(response) {
            vm.jobsList = response.data;
        }
        function onError(error) {
            console.log('GET to /api/jobs failed: ', error);
        }
    };
});



app.controller('editCtrl', function($http) {
    var vm = this;

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