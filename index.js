/*!
 * is-symlink <https://github.com/jonschlinkert/is-symlink>
 *
 * Copyright (c) 2016-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const isSymlink = (filepath, cb) => {
  if (typeof cb !== 'function') {
    return util.promisify(isSymlink)(filepath);
  }

  if (typeof filepath !== 'string') {
    cb(new TypeError('expected filepath to be a string'));
    return;
  }

  fs.lstat(path.resolve(filepath), (err, stats) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, stats.isSymbolicLink());
  });
};

isSymlink.sync = filepath => {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }
  try {
    let stats = fs.lstatSync(path.resolve(filepath));
    return stats.isSymbolicLink();
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
};

module.exports = isSymlink;
