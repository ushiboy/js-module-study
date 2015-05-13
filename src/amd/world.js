define(['underscore'], function(_) {
  return {
    world: function() {
      console.log('world');
    },
    test: function() {
      console.log(_.uniqueId());
    }
  };
});
