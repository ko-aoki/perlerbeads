angular.module('perlerbeadsApp')
  .controller('HandleSavedRecDialogCtrl', ['$scope', '$modalInstance', 'beadDataService', 'name', 'currentData',
    function ($scope, $modalInstance, beadDataService, name, currentData) {

      $scope.name = name;
      $scope.edit = function () {
        currentData = beadDataService.getDataByName(name);
        beadDataService.currentSave(currentData.data);
        $modalInstance.close();
      };

      $scope.deleteData = function () {
        beadDataService.deleteData(name);
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss();
      };
    }]);
