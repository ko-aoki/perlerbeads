angular.module('perlerbeadsApp').service('beadViewService',['beadService', 'squarePalette',
  function (beadService, squarePalette) {
    this.setPaletteType = function (paletteType) {
      this.palette = beadService.getPalette(paletteType);
    };

    this.makePalette = function () {
      return this.palette.makePalette();
    };

    this.convert = function (data, isThumbnail, idx) {
      return this.palette.convert(data, isThumbnail, idx);
    };

    this.countColors = function(beadsList) {
      var colors = {};
      for(topIdx = 0; topIdx < beadsList.length; topIdx++) {
        for (leftIdx = 0; leftIdx < beadsList[topIdx].length; leftIdx++) {
          var color = beadsList[topIdx][leftIdx].color;
          if ( color == 'deselect') {
            continue;
          }
          if (colors[color] == null) {
            colors[color] = 1;
          } else {
            colors[color]++;
          }
        }
      }
      return colors;
    }

  }]);
