angular.module('starter.controllers', ['BinusMayaFactory'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var api_key = '614699981f6d1987e3b0a68308a57de2';

  if(typeof localStorage.settings === "undefined") {
    localStorage.settings = JSON.stringify({
      masterUrl: 'http://0.0.0.0/assistant'
    });
  }

  $scope.settings = localStorage.settings;

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('MainCtrl', function($scope, $stateParams, $ionicScrollDelegate, $timeout) {

  $scope.chat = [
    //{text:'Rute Busway dari Sumber Waras ke Mampang Prapatan'},
    /*{text:'Jadwal kuliah kamu hari ini', isBot: 'bot binusmaya-schedule', isBimaySchedule: true,
    list: [
      {
        name: 'Enterpreneour',
        room: '825',
        time: '09:20 - 11:00'
      }
    ]
  }*/
    /*{text:'Ini Halte terdekat dalam radius 500m :)', isBot: 'bot is-busway', isBusway: true,
      list: [{
        distance: 343,
        id: 51,
        lat: "-6.166255",
        lng: "106.796937",
        name: "Sumber Waras"
      }, {
        distance: 343,
        id: 51,
        lat: "-6.166255",
        lng: "106.796937",
        name: "Grogol 1"
      }]
    },*/ /*
    {text:'Ini dia rute dari Sumber Waras ke Mampang Prapatan', isBot: 'bot is-busway-route', isBuswayRoute: true,
      list: [{
        stations: [
          {id: 51, name: "Sumber Waras"},
          {id: 51, name: "Harmoni Central"},
          {id: 12, name: "Dukuh Atas 1"},
        ]
      }, {
        stations: [
          {id: 78, name: "Dukuh Atas 2"},
          {id: 105, name: "Mampang Prapatan"},
        ]
      }]
    }, /*
    {text:'Hello !', isBot: ''},
    {text:'Film yang ada di biskop hari ini adalah', isBot: 'bot is-movie', isMovie: true,
      list: ['SAN ANDREAS', 'THE MARTIAN', 'AMERICAN ULTRA', '3', 'HOLLYWORD ADVENTURES']
    }*/
  ];

  $scope.submit = function() {
    if(!$scope.text) return false;
    $scope.chat.push({
      text: $scope.text,
      isBot: ''
    });
    $ionicScrollDelegate.resize();
    $ionicScrollDelegate.scrollBottom();
    sendBack($scope.text);
    $scope.text = "";
  };

  $scope.voice = function() {
    var maxMatches = 1;
    var promptString = "Ngomong lah !"; // optional
    var language = "id-ID";                     // optional
    window.plugins.speechrecognizer.startRecognize(function(result){
      $scope.chat.push({
        text: result[0],
        isBot: ''
      });
      $ionicScrollDelegate.resize();
      $ionicScrollDelegate.scrollBottom();
      sendBack(result[0]);
    }, function(errorMessage){

    }, maxMatches, promptString, language);
  };

  function sendBack(text) {
    $scope.loading = true;

    $timeout(function () {
      _brain.getResponse(text, function(res) {
        $scope.$applyAsync(function() {
          $scope.chat.push(res);
          $scope.loading = false;
          $ionicScrollDelegate.resize();
          $ionicScrollDelegate.scrollBottom();
          console.log("RESPONSE :", res);
        });
      });
    }, 1000);

  }
})

.controller('SettingsCtrl', function($scope, $stateParams, $ionicPopup, BinusMaya) {

  $scope.binusmaya = {};
  $scope.settings = JSON.parse(localStorage.settings);

  $scope.save = function() {
    $ionicPopup.alert({
      title: 'Success',
      template: 'Setting Saved'
    });
    localStorage.settings = JSON.stringify($scope.settings);
  };

  $scope.logoutBimay = function() {
    delete $scope.settings.binusmaya;
    localStorage.settings = JSON.stringify($scope.settings);
  };

  $scope.loginBimay = function() {
    delete localStorage.cookie;
    if (!($scope.binusmaya.userid && $scope.binusmaya.password)) {
      $ionicPopup.alert({
        title: 'Oops !',
        template: 'Please Input Binusian ID and Password'
      });
    } else {
      cordova.plugin.pDialog.init({
          theme : 'HOLO_DARK',
          progressStyle : 'SPINNER',
          cancelable : false,
          title : 'Please Wait...',
          message : 'Checking User Credential'
      });
      BinusMaya.login($scope.binusmaya.userid, $scope.binusmaya.password)
      .then(function(name) {
        cordova.plugin.pDialog.dismiss();
        console.log(name);
        $scope.settings.binusmaya = {
          name: name,
          binusid: $scope.binusmaya.userid,
          password: $scope.binusmaya.password
        };
        localStorage.settings = JSON.stringify($scope.settings);
      }, function(e) {
        cordova.plugin.pDialog.dismiss();
        $ionicPopup.alert({
          title: 'Oops !',
          template: e.err ? e.err : 'Something wrong !'
        });
      });
    }
  };

});
