/**
 * @ngdoc function
 * @name perlerbeadsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the perlerbeadsApp
 */
angular.module('perlerbeadsApp')
  .controller('MainCtrl',
  ['$scope', '$modal', 'beadsDataService', 'beadsViewService', 'squarePalette',
    function ($scope, $modal, beadsDataService, beadsViewService, squarePalette) {

      var savedRecs = beadsDataService.load();
      beadsViewService.setPaletteType(squarePalette);
      if (savedRecs != null) {
        for (var i = 0; i < savedRecs.length; i++) {
          savedRecs[i].data = beadsViewService.convert(savedRecs[i].data, true, i);
        }
      }
      $scope.savedRecs = savedRecs;

      function displayCurrent(){
        if (beadsDataService.currentGet() == null) {
          $scope.beadsList = beadsViewService.makePalette();
        } else {
          $scope.beadsList = beadsViewService.convert(beadsDataService.currentGet());
          $scope.colors = beadsViewService.countColors($scope.beadsList);
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
        beadsDataService.currentSave($scope.beadsList);
        $scope.colors = beadsViewService.countColors($scope.beadsList);
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

        modalInstance.result.then(function () {
          displayCurrent();
        });
      };

/*
      $scope.open = function () {
        var modalInstance = $modal.open({
          size: 'sm',
          templateUrl: 'contextMenu.tmpl.html',
          controller: 'ContextMenuCtrl'
        });

        modalInstance.result.then(function (color) {
          $scope.color = color;
        });
      };
*/

      $scope.save = function () {
        var modalInstance = $modal.open({
          size: 'sm',
          templateUrl: 'saveDialog.tmpl.html',
          controller: 'SaveDialogCtrl'
        });

        modalInstance.result.then(function (fileName) {
          beadsDataService.save(fileName, $scope.beadsList);
        });
      };

    }]);
