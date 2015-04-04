angular.module('palette').service('squarePalette',
  function () {
    this.sideLength = 20;
    this.beadsLength = 20;
    this.margin = 2;
    this.thunmbnailBeadsLength = 5;
    this.thunmbnailTopOffset = 40;
    this.thunmbnailRecordOffset = 150;
    this.thunmbnailMargin = 0;
    this.makePalette = function (isThumbnail, idx) {
      var topIdx, leftIdx, beadsLength, topOffset, recordOffset, margin;
      var beads = new Array(this.sideLength);
      if (isThumbnail) {
        beadsLength = this.thunmbnailBeadsLength;
        topOffset = this.thunmbnailTopOffset;
        recordOffset = this.thunmbnailRecordOffset * idx;
        margin = this.thunmbnailMargin;
      } else {
        beadsLength = this.beadsLength;
        topOffset = 0;
        recordOffset = 0;
        margin = this.margin;
      }
      for (topIdx = 0; topIdx < this.sideLength; topIdx++) {
        beads[topIdx] = new Array(this.sideLength);
        for (leftIdx = 0; leftIdx < this.sideLength; leftIdx++) {
          beads[topIdx][leftIdx] = {};
          beads[topIdx][leftIdx].top = topIdx * (beadsLength + margin) + topOffset;
          beads[topIdx][leftIdx].left = leftIdx * (beadsLength + margin) + recordOffset;
          beads[topIdx][leftIdx].color = 'deselect';
          console.log("beads.length[" + topIdx +"]:" + beads[topIdx].length);
        }
      }
console.log("beads.length:" + beads.length);
      return beads;
    };

    this.makeThumbnailPalette = function (idx) {
      return this.makePalette(true, idx);
    };

    this.convert = function(data, isThumbnail, idx) {
      var topIdx , leftIdx;
      var convData = [];
      if (isThumbnail) {
        convData = this.makeThumbnailPalette(idx);
      } else {
        convData = this.makePalette();
      }
      for(topIdx = 0; topIdx < convData.length; topIdx++) {
        for(leftIdx = 0; leftIdx < convData[topIdx].length; leftIdx++) {
          convData[topIdx][leftIdx].color = data[topIdx][leftIdx].color;
        }
      }
      return convData;
    };
  });
