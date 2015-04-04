angular.module('perlerbeadsApp')
  .controller('HandleSavedRecDialogCtrl', ['$scope', '$modalInstance', 'beadDataService', 'beadViewService', 'name', 'currentData',
    function ($scope, $modalInstance, beadDataService,  beadViewService, name, currentData) {

      $scope.name = name;
      $scope.edit = function () {
        currentData = beadDataService.getDataByName(name);
        beadViewService.setPaletteType(currentData.paletteType);
        beadDataService.currentSave(name, currentData.paletteType, beadViewService.convert(currentData.data));
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
