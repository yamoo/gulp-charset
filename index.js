var through = require('through2');
var gutil = require('gulp-util');
var charset = require('./lib/charset');
var PluginError = gutil.PluginError;
var PluginLog = gutil.log;

const PLUGIN_NAME = 'gulp-charset';

function gulpCharset(options) {
  'use strict';

  return through.obj(function(file, enc, cb) {
    var contents;
    var compiled;

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    compiled = new charset({
      file: file,
      settings: options
    });
    file.contents = new Buffer(compiled);

    // Print a success message.
    PluginLog('File "' + file.path + '" created.');

    cb(null, file);
  });
}

module.exports = gulpCharset;