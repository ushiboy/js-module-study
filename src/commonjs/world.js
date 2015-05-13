var _ = require('underscore');

module.exports = {
  world: function() {
    console.log('world');
  },
  test: function() {
    console.log(_.uniqueId());
  }
};
