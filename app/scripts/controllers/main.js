/**
 * @ngdoc function
 * @name perlerbeadsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the perlerbeadsApp
 */
angular.module('perlerbeadsApp')
  .controller('MainCtrl',
  ['$scope', '$modal', '$window', 'beadDataService', 'beadViewService', 'squarePalette',
    function ($scope, $modal, $window, beadDataService, beadViewService, squarePalette) {

      var savedRecs = beadDataService.load();
      beadViewService.setPaletteType(squarePalette);
      if (savedRecs != null) {
        for (var i = 0; i < savedRecs.length; i++) {
          savedRecs[i].data = beadViewService.convert(savedRecs[i].data, true, i);
        }
      }
      $scope.savedRecs = savedRecs;

      function displayCurrent(){
        if (beadDataService.currentGet() == null) {
          $scope.beadsList = beadViewService.makePalette();
        } else {
          $scope.beadsList = beadViewService.convert(beadDataService.currentGet());
          $scope.colors = beadViewService.countColors($scope.beadsList);
        }
      };
      displayCurrent();

      $scope.color = 'deselect';

      $scope.select = function(color) {
        $scope.color = color;
      };

      $scope.changeColor = function (bead) {
        if (bead.color == $scope.color) {
          bead.color = 'deselect';
        } else {
          bead.color = $scope.color;
        }
        beadDataService.currentSave($scope.beadsList);
        $scope.colors = beadViewService.countColors($scope.beadsList);
      };

      $scope.handleSavedRec = function (name) {
        var modalInstance = $modal.open({
          size: 'sm',
          templateUrl: 'handleSavedRecDialog.tmpl.html',
          controller: 'HandleSavedRecDialogCtrl',
          resolve: {
            name: function () {
              return name;
            },
            currentData: function() {
              return $.curretnData;
            }
          }
        });

        modalInstance.result.then(function (){
          $scope.name = name;
          displayCurrent();
        });
      };

      $scope.save = function () {
        var modalInstance = $modal.open({
          size: 'sm',
          templateUrl: 'saveDialog.tmpl.html',
          controller: 'SaveDialogCtrl',
          resolve: {
            name: function () {
              return $scope.name;
            }
          }
        });

        modalInstance.result.then(function (fileName) {
          beadDataService.save(fileName, $scope.beadsList);
        });
      };

      $scope.makeNewData = function () {
        if ($window.confirm( 'いまのずあんをほぞんしますか？')) {
          $scope.save();
        }
        $scope.name = '';
        $scope.beadsList = beadViewService.makePalette();
        $scope.colors = beadViewService.countColors($scope.beadsList);
      };

    }]);
