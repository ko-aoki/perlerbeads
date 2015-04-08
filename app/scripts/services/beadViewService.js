angular.module('perlerbeadsApp').service('beadViewService',['beadService',
  function (beadService) {
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
      var i,j;
      for(i = 0; i < beadsList.length; i++) {
        for (j = 0; j < beadsList[i].length; j++) {
          var color = beadsList[i][j].color;
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
