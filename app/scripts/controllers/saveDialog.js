angular.module('perlerbeadsApp')
  .controller('SaveDialogCtrl', ['$scope', '$modalInstance', 'name',
    function ($scope, $modalInstance, name) {

      $scope.fileName = name;
  $scope.save = function (fileName) {
    $modalInstance.close($scope.fileName);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
