angular.module('perlerbeadsApp').service('beadViewService',['beadService',
  function (beadService) {
    this.setPaletteType = function (paletteType) {
      this.palette = beadService.getPalette(paletteType);
    };

    this.makePalette = function (paletteType) {
      return beadService.getPalette(paletteType).makePalette();
    };

    this.convert = function (paletteType, data, isThumbnail, idx) {
      return beadService.getPalette(paletteType).convert(data, isThumbnail, idx);
    };

    this.countColors = function(beadsList) {
      var colors = {};
      var i,j;
      for(i = 0; i < beadsList.length; i++) {
        for (j = 0; j < beadsList[i].length; j++) {
          var color = beadsList[i][j].color;
          if ( color == 'deselect') {
            continue;
          }
          if (colors[color] == null) {
            colors[color] = {cnt:1, colorName: beadService.getColorName(color)};
          } else {
            colors[color].cnt++;
          }
        }
      }
      return colors;
    }

  }]);
