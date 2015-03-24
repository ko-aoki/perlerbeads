angular.module('perlerbeadsApp').service('beadsViewService',
  function () {
    this.setPaletteType = function (palette) {
      this.palette =  palette;
    };

    this.makePalette = function () {
      return this.palette.makePalette();
    };

    this.convert = function (data, isThumbnail, idx) {
      return this.palette.convert(data, isThumbnail, idx);
    };

    this.countColors = function(beadsList) {
      var colors = {};
      for(topIdx = 0; topIdx < 14; topIdx++) {
        for (leftIdx = 0; leftIdx < 14; leftIdx++) {
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

  });
