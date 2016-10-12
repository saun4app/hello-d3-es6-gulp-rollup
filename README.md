# hello-d3-es6-gulp-rollup

`hello-d3-es6-gulp-rollup` provides an example of using the following to display text on the screen:
- `d3.js` (v4)
- `es6` (`ES2015`)
- `rollup.js`
- `gulp` (**without** `rollup.config.js`)

#### Example
<img src="https://raw.github.com/saun4app/hello-d3-es6-gulp-rollup/master/demo-screen.png"
	alt="Demo screen" onclick="window.open('(https://saun4app.github.io/hello-d3-es6-gulp-rollup', '_blank');" />

#### Install
```
$ git clone git@github.com:saun4app/hello-d3-es6-gulp-rollup.git demo-app
$ cd demo-app/
$ npm install
```

##### Build
```
$ gulp
```
or
```
$ gulp build
```

##### Build uglified version
```
$ gulp ugly
```
The resulting files are in `build` directory.

##### Run on web server
```
$ npm start
```
or
```
$ http-server ./build -p 3020
```
View the page on `http://localhost:3020/`

<img src="https://raw.github.com/saun4app/hello-d3-es6-gulp-rollup/master/demo-screen.png"
	alt="Demo screen" onclick="window.open('(https://saun4app.github.io/hello-d3-es6-gulp-rollup', '_blank');" />

#### Known Issues

##### Problem:
`Uncaught ReferenceError: d3 is not defined`

##### Temporary "Solution"
Embedding
```
<script src="https://d3js.org/d3.v4.min.js" type="text/javascript"></script>
```
in `index.html`.

There are discussions about this (or similar) issues.  I have not found a clean solution yet, and have spent enough time on this for now.  Any suggestions would be greatly appreciated.
- https://code.lengstorf.com/learn-rollup-js/
- https://github.com/rollup/rollup/issues/592
- https://github.com/rollup/rollup-plugin-commonjs/issues/6
- https://github.com/rollup/rollup-plugin-commonjs/issues/31


#### Resources
- https://d3js.org
- https://github.com/jlengstorf/learn-rollup
- https://github.com/mizmaar3/gulp-es6-rollup-boilerplate
- http://rollupjs.org
