'use strict';

module.exports = {
  todayWithoutHours: function () {
    var today = new Date().toISOString().replace(/T.+/, '');
    return Date.parse(today);
  }
};
