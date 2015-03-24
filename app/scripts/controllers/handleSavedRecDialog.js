angular.module('perlerbeadsApp')
  .controller('HandleSavedRecDialogCtrl', ['$scope', '$modalInstance', 'beadsDataService', 'name', 'currentData',
    function ($scope, $modalInstance, beadsDataService, name, currentData) {

      $scope.name = name;
      $scope.edit = function () {
        currentData = beadsDataService.getDataByName(name);
        beadsDataService.currentSave(currentData.data);
        $modalInstance.close();
      };

      $scope.deleteData = function () {
        beadsDataService.deleteData(name);
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss();
      };
    }]);
