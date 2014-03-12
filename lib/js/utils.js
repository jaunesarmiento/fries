this.fries = this.fries || {};

(function () {

  var utils = {

    merge: function (obj1, obj2) {
      var obj3 = {},
          attrname;
      for (attrname in obj1) { obj3[attrname] = obj1[attrname]; }
      for (attrname in obj2) { obj3[attrname] = obj2[attrname]; }
      return obj3;
    }

  };

  fries.utils = utils;

}());
