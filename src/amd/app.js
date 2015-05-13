// require([
define([
  './hello',
  './world'
], function(hello, w) {
  hello();
  w.world();
  w.test();
});
