'use strict';

require('mocha');
var fs = require('fs');
var assert = require('assert');
var isSymlink = require('./');

describe('isSymlink', function() {
  it('should export a function', function() {
    assert.equal(typeof isSymlink, 'function');
  });

  describe('errors', function() {
    it('should throw an error when callback is not passed', function(cb) {
      try {
        isSymlink();
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'expected a callback function');
        cb();
      }
    });

    it('should throw an error when filepath is not a string', function(cb) {
      isSymlink(null, function(err, symlink) {
        assert(err);
        assert.equal(err.message, 'expected filepath to be a string');
        cb();
      });
    });

    it('should throw an error when filepath is not a string', function(cb) {
      try {
        isSymlink.sync(null, function() {});
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'expected filepath to be a string');
        cb();
      }
    });
  });

  describe('async', function() {
    beforeEach(function(cb) {
      fs.symlink('index.js', 'foo.js', cb);
    });

    afterEach(function(cb) {
      fs.unlink('foo.js', cb);
    });

    it('should return false if a path is not a symlink', function(cb) {
      isSymlink('index.js', function(err, is) {
        if (err) return cb(err);
        assert(!is);
        cb();
      });
    });

    it('should return true if a path is a symlink', function(cb) {
      isSymlink('foo.js', function(err, is) {
        if (err) return cb(err);
        assert(is);
        cb();
      });
    });
  });

  describe('sync', function() {
    beforeEach(function(cb) {
      fs.symlink('index.js', 'foo.js', cb);
    });

    afterEach(function(cb) {
      fs.unlink('foo.js', cb);
    });

    it('should return false if a path is not a symlink', function(cb) {
      assert(!isSymlink.sync('index.js'));
      cb();
    });

    it('should return true if a path is a symlink', function(cb) {
      assert(isSymlink.sync('foo.js'));
      cb();
    });
  });
});
