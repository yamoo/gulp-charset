var iconv = require('iconv-lite');
var _ = require('lodash');

function charset(config) {
  'use strict';

  var self = this;
  var defaults = {
    from: 'UTF-8',
    to: 'Shift_JIS',
    fileTypes: {
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
  };

  self.contents = config.contents;
  self.options = _.extend({}, defaults, config.settings);
  self.ext = config.ext;

  _.forOwn(defaults.fileTypes, function (type, typeName) {
    self.options.fileTypes[typeName] = _.merge({}, type, self.options.fileTypes[typeName]);
  });

  return self.convert();
}

charset.prototype.convert = function (filepath) {
  var self = this;
  var src = self.contents;
  var writeBuffer;

  // Replace charset code.
  _.forOwn(self.options.fileTypes, function (type) {
    var detect;
    var replace;

    if (_.indexOf(type.ext, self.ext) !== -1) {
      detect = type.detect;
      replace = type.replace.replace('{{charset}}', self.options.to);
      src = src.replace(detect, replace);
    }
  });

  // Convert encoding.
  writeBuffer = iconv.encode(src, self.options.to);

  return writeBuffer;
};

module.exports = charset;