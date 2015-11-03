'use strict';

module.exports = compile;

var stylus = require('stylus');
var nib = require('nib');
var mix = require('mix2');

var REGEX_NIB = /import\s+(['"])nib\1/;

function compile (content, options, callback) {
  options = mix({}, options);

  if (!REGEX_NIB.test(content)) {
    content = '@import "nib"\n' + content;
  }

  stylus(content)
  .use(nib())
  .render(function (err, css) {
    if (err) {
      return callback();
    }

    callback(null, {
      content: css
    });
  });
}
