/*!
 * is-symlink <https://github.com/jonschlinkert/is-symlink>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(filepath, cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('expected a callback function');
  }
  if (typeof filepath !== 'string') {
    cb(new TypeError('expected filepath to be a string'));
    return;
  }

  fs.lstat(path.resolve(filepath), function(err, stats) {
    if (err) return cb(err);
    cb(null, stats.isSymbolicLink());
  });
};

module.exports.sync = function(filepath) {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }
  try {
    var stats = fs.lstatSync(path.resolve(filepath));
    return stats.isSymbolicLink();
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
};
