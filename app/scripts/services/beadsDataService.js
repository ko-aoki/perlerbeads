angular.module('perlerbeadsApp').service('beadsDataService', ['$resource', '$window',
  function ($resource, $window) {
    this.currentSave = function (currentData) {
      $window.localStorage.setItem('CURRENT_DATA', angular.toJson(currentData));
    };

    this.currentGet = function () {
      return angular.fromJson($window.localStorage.getItem('CURRENT_DATA'));
    };

    this.save = function (name, data) {
      var records = [];
      if ($window.localStorage.getItem('PERSISTED_DATA') != null) {
        records = angular.fromJson($window.localStorage.getItem('PERSISTED_DATA'));
      }
      var persistingData = {
        name: name,
        data: this.removePosition(data),
        timestamp: new Date()
      };

      for (var i=0; i<records.length; i++) {
        var rec = records[i];
        if (rec.name === name) {
          if ($window.confirm('「' + name + '」' + ' おなじなまえがあります。うわがきしますか？')) {
            records[i] = persistingData;
          }
          break;
        }
        if (i === records.length - 1) {
          records.push(persistingData);
          break;
        }
      }
      if (records.length < 1) {
        records.push(persistingData);
      }
      $window.localStorage.setItem('PERSISTED_DATA', angular.toJson(records));
    };

    this.load = function () {
      return angular.fromJson($window.localStorage.getItem('PERSISTED_DATA'));
    };

    this.delete= function (name) {
      var records = [];
      if ($window.localStorage.getItem('PERSISTED_DATA') != null) {
        records = angular.fromJson($window.localStorage.getItem('PERSISTED_DATA'));
      }
      for (var i=0; i<records.length; i++) {
        var rec = records[i];
        if (rec.name === name) {
          if ($window.confirm('「' + name + '」' + 'さくじょしますか？')) {
            records.splice(i,1);
          }
        }
      }
      $window.localStorage.setItem('PERSISTED_DATA', angular.toJson(records));
    };

    this.getDataByName = function (name) {
      var records = [];
      if ($window.localStorage.getItem('PERSISTED_DATA') != null) {
        records = angular.fromJson($window.localStorage.getItem('PERSISTED_DATA'));
      }
      for (var i=0; i<records.length; i++) {
        var rec = records[i];
        if (rec.name === name) {
          return rec;
        }
      }
      return {};
    };

    this.removePosition = function(data) {
      for (var topIdx = 0; topIdx < this.sideLength; topIdx++) {
        for (var leftIdx = 0; leftIdx < this.sideLength; leftIdx++) {
          data[topIdx][leftIdx].removeAttribute('top');
          data[topIdx][leftIdx].removeAttribute('left');
        }
      }
      return data;
    };

  }]);
