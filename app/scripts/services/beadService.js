angular.module('perlerbeadsApp').service('beadService',['squarePalette', 'circlePalette',
  function (squarePalette, circlePalette) {

    this.getPalette = function(paletteType) {
      switch (paletteType) {
        case "SQUARE":
          return squarePalette;
        case "CIRCLE":
          return circlePalette;
      }
    }

  }]);
