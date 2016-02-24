'use strict'

module.exports = compile

var stylus = require('stylus')
var nib = require('nib')
var mix = require('mix2')
var make_array = require('make-array')


var REGEX_NIB = /import\s+(['"])nib\1/

function compile (content, options, callback) {
  options = mix({}, options)

  if (!REGEX_NIB.test(content)) {
    content = '@import "nib"\n' + content
  }

  var s = stylus(content)
  s.use(nib())

  s.set('filename', options.filename)

  if (options.paths) {
    make_array(options.paths)
      .filter(Boolean)
      .forEach(function (path) {
        if (options.resolve) {
          path = options.resolve(path)
        }

        s.include(path)
      })
  }

  s.render(function (err, css) {
    if (err) {
      return callback(err)
    }

    callback(null, {
      content: css
    })
  })
}
