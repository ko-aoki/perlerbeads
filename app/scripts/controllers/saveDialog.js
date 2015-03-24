angular.module('perlerbeadsApp')
  .controller('SaveDialogCtrl', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {

  $scope.save = function (fileName) {
    $modalInstance.close($scope.fileName);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
