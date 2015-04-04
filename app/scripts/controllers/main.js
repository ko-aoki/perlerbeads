/**
 * @ngdoc function
 * @name perlerbeadsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the perlerbeadsApp
 */
angular.module('perlerbeadsApp')
  .controller('MainCtrl',
  ['$scope', '$modal', '$window', '$q', 'beadDataService', 'beadViewService', 'squarePalette',
    function ($scope, $modal, $window, $q, beadDataService, beadViewService, squarePalette) {

      var savedRecs = beadDataService.load();
      if (savedRecs != null) {
        for (var i = 0; i < savedRecs.length; i++) {
          beadViewService.setPaletteType(savedRecs[i].paletteType);
          savedRecs[i].data = beadViewService.convert(savedRecs[i].data, true, i);
        }
      }
      $scope.savedRecs = savedRecs;

      function displayCurrent(){
        var currentData = beadDataService.currentGet();
        if (currentData == null) {
          $scope.paletteType = "SQUARE";
          beadViewService.setPaletteType($scope.paletteType);
          $scope.beadsList = beadViewService.makePalette();
        } else {
          $scope.name = currentData.name;
          $scope.paletteType = currentData.paletteType;
          beadViewService.setPaletteType($scope.paletteType);
          $scope.beadsList = beadViewService.convert(currentData.data);
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
        beadDataService.currentSave($scope.name, $scope.paletteType, $scope.beadsList);
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
        var deferred = $q.defer();
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
          beadDataService.save(fileName, $scope.paletteType, $scope.beadsList);
          deferred.resolve();
        },function() {
          deferred.resolve();
        });
        return deferred.promise;
      };

      $scope.makeNewData = function () {
        var promise;
        if ($window.confirm( 'いまのずあんをほぞんしますか？')) {
          promise = $scope.save();
        }

        var makeNewDataFunc = function() {
          var modalInstance = $modal.open({
            size: 'sm',
            templateUrl: 'newPaletteDialog.tmpl.html',
            controller: 'NewPaletteDialogCtrl'
          });

          modalInstance.result.then(function (paletteType) {
            $scope.name = '';
            $scope.paletteType = paletteType;
            $scope.beadsList = beadViewService.makePalette(paletteType);
          });
        };
        if (promise !== undefined) {
          promise.then(makeNewDataFunc);
        } else {
          makeNewDataFunc();
        }
      };

    }]);
