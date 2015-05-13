#モジュールまわりのお話

##モジュール定義の仕方おさらい

###CommonJSスタイル

```javascript
/* hello.js */
function hello() {
  console.log('hello');
}
module.exports = hello;

/* world.js */
var _ = require('underscore');
module.exports = {
  world: function() {
    console.log('world');
  },
  test: function() {
    console.log(_.uniqueId());
  }
};

/* app.js */
var hello = require('./hello'),
  w = require('./world');
hello();
w.world();
w.test();
```

###AMDスタイル

```javascript
/* hello.js */
define(function() {
  return function() {
    console.log('hello');
  };
});

/* world.js */
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

/* app.js */
define([
  './hello',
  './world'
], function(hello, w) {
  hello();
  w.world();
  w.test();
});
```

###ECMAScript6スタイル

```javascript
/* hello.js */
export default function() {
  console.log('hello');
}

/* world.js */
import _ from 'underscore';
export default function world() {
  console.log('world');
}
export function test() {
  console.log(_.uniqueId());
}

/* app.js */
import hello from './hello';
import world, { test } from './world';
hello();
world();
test();
```

##モジュールローダーちょっとだけ

browserifyとwebpackでよくやりそうなことをやってみる。

- JavaScriptビルド
- watchで差分ビルド
- bowerとの併用
- gulpとの組み合わせ

###browserify

公式
http://browserify.org/

```
$ npm install -g browserify
```

####JavaScriptビルド

```
$ browserify src/commonjs/app.js -o dist/b-commonjs-app.js
```

####watchで差分ビルド

watchifyを使う。
```
$ npm install -g watchify
```

```
$ watchify src/commonjs/app.js -o dist/b-commonjs-app.js -v
```

####bowerとの併用

debowerifyをかませる。
```
$ browserify -t debowerify src/dep-bower/test.js -o dist/test.js
```

####gulpとの組み合わせ

gulp-browserifyはdeprecated。
公式のレシピに従う。

https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md

####参考
https://github.com/substack/node-browserify/wiki/list-of-transforms

###webpack

公式
http://webpack.github.io/

```
$ npm install -g webpack
```

####JavaScriptビルド

```
$ webpack src/commonjs/app.js dist/w-commonjs-app.js
```


####watchで差分ビルド

watchモードを使う。
```
$ webpack src/commonjs/app.js dist/w-commonjs-app.js --watch
```

####bowerとの併用

参考 http://webpack.github.io/docs/usage-with-bower.html

設定に解決用のパス追加して実行。
```javascript
var path = require('path');
var webpack = require("webpack");
module.exports = {
  resolve: {
    root: [path.join(__dirname, "bower_components")]
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ]
};
```

```
$ webpack --config webpack.with.bower.config.js src/dep-bower/test.js dist/test2.js
```

####gulpとの組み合わせ

そのまま使うかgulp-webpackなどを使う。

http://webpack.github.io/docs/usage-with-gulp.html

####参考
http://webpack.github.io/docs/list-of-loaders.html
