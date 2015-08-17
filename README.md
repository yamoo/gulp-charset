# gulp-charset

> Convert text encoding and replace charset code

## Overview
This is a Gulp plugin for converting charset of multiple file types.

* This plugin a remake of [grunt-charset](https://github.com/rakuten-frontend/grunt-charset).

## Getting Started

```shell
npm install gulp-charset --save-dev
```

## Usage

```js
var gulp = require('gulp');
var charset = require('gulp-charset');

gulp.task('default', function() {
  return gulp.src(['./src/**'])
    .pipe(charset())
    .pipe(gulp.dest('./out'));
});
```

### Options

#### from
Type: 'String'
Default: `UTF-8`

Encoding of source charset.
Supported encodings are same as [iconv-lite](https://github.com/ashtuchkin/iconv-lite#supported-encodings) module.

#### to
Type: 'String'
Default: `Shift_JIS`

Encoding of output charset. This also depends on iconv-lite.

#### fileTypes
Type: 'Object'
Default: (See below)

Configuration of charset code replacement.

```js
fileTypes: {
  xml: {
    ext: ['.html'],
    detect: /<\?xml\s+version=["']?1.0["']?\encoding=.+?["']?\s*\?>/i,
    replace: '<?xml version="1.0" encoding="{{charset}}"?>'
  },
  html5: {
    ext: ['.html'],
    detect: /<meta\s+charset=["']?.+?["']?\s*\/?>/i,
    replace: '<meta charset="{{charset}}">'
  },
  html4: {
    ext: ['.html'],
    detect: /<meta\s+http-equiv=["']?Content-Type["']?\scontent=["']?.*?charset=.+?["']?\s*\/?>/i,
    replace: '<meta http-equiv="Content-Type" content="text/html; charset={{charset}}">'
  },
  css: {
    ext: ['.css'],
    detect: /^@charset\s+(".+?"|'.+?')/,
    replace: '@charset "{{charset}}"'
  }
}
```