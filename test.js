'use strict';

require('mocha');
const fs = require('fs');
const assert = require('assert');
const isSymlink = require('./');

describe('isSymlink', () => {
  it('should export a function', () => {
    assert.equal(typeof isSymlink, 'function');
  });

  describe('errors', () => {
    it('should throw an error when callback is not passed', () => {
      return isSymlink()
        .then(() => {
          throw new Error('expected an error');
        })
        .catch(err => {
          assert(/expected filepath/.test(err.message));
        })
    });

    it('should throw an error when filepath is not a string', cb => {
      isSymlink(null, err => {
        assert(err);
        assert.equal(err.message, 'expected filepath to be a string');
        cb();
      });
    });

    it('should throw an error when filepath is not a string', () => {
      assert.throws(() => isSymlink.sync(null, () => {}), /expected filepath/);
    });
  });

  describe('async', () => {
    beforeEach(cb => {
      fs.symlink('index.js', 'foo.js', cb);
    });

    afterEach(cb => {
      fs.unlink('foo.js', cb);
    });

    it('should return false if a path is not a symlink', cb => {
      isSymlink('index.js', (err, is) => {
        if (err) return cb(err);
        assert(!is);
        cb();
      });
    });

    it('should return true if a path is a symlink', cb => {
      isSymlink('foo.js', (err, is) => {
        if (err) return cb(err);
        assert(is);
        cb();
      });
    });
  });

  describe('sync', () => {
    beforeEach(cb => {
      fs.symlink('index.js', 'foo.js', cb);
    });

    afterEach(cb => {
      fs.unlink('foo.js', cb);
    });

    it('should return false if a path is not a symlink', cb => {
      assert(!isSymlink.sync('index.js'));
      cb();
    });

    it('should return true if a path is a symlink', cb => {
      assert(isSymlink.sync('foo.js'));
      cb();
    });
  });
});
