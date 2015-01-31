'use strict';

// http://stackoverflow.com/a/4413721/905697
var addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

module.exports = {
  dayWithoutHours: function (customDate) {
    var date;
    if (customDate) {
      date = new Date(customDate);
    } else {
      date = new Date();
    }
    var yyyyMmDd = date.toISOString().replace(/T.+/, '');
    return Date.parse(yyyyMmDd);
  },

  addDays: addDays,

  // http://stackoverflow.com/a/4413991/905697
  dateRange: function (startDate, endDate, addFn, interval) {
    addFn = addFn || addDays;
    interval = interval || 1;

    var retVal = [];
    var current = new Date(startDate);
    var end = new Date(endDate);

    while (current <= end) {
      retVal.push(new Date(current));
      current = addFn.call(current, interval);
    }

    return retVal;
  }
};
