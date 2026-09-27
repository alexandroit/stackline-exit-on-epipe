'use strict';
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const handle = require('../');

describe('returning custom EPIPE handlers', function () {
  for (const properties of [{ code: 'EPIPE' }, { errno: 32 }]) {
    it('does not rethrow a handled ' + JSON.stringify(properties), function () {
      const stream = new EventEmitter();
      let calls = 0;
      handle(stream, function () { ++calls; });
      const error = Object.assign(new Error('closed pipe'), properties);
      assert.doesNotThrow(function () { stream.emit('error', error); });
      assert.doesNotThrow(function () { stream.emit('error', error); });
      assert.equal(calls, 2);
      assert.equal(stream.listenerCount('error'), 1);
    });
  }
  it('preserves a thrown callback error', function () {
    const stream = new EventEmitter();
    const failure = new Error('callback failed');
    handle(stream, function () { throw failure; });
    assert.throws(function () { stream.emit('error', { code: 'EPIPE' }); }, function (error) { return error === failure; });
  });
  it('passes unrelated errors to another listener exactly once', function () {
    const stream = new EventEmitter();
    const failure = Object.assign(new Error('disk'), { code: 'EIO' });
    let seen = 0;
    handle(stream, function () { assert.fail('must not bail'); });
    stream.on('error', function (error) { assert.equal(error, failure); ++seen; });
    stream.emit('error', failure);
    assert.equal(seen, 1);
  });
  it('throws an unrelated error if no other listener handles it', function () {
    const stream = new EventEmitter();
    const failure = Object.assign(new Error('disk'), { code: 'EIO' });
    handle(stream, function () { assert.fail('must not bail'); });
    assert.throws(function () { stream.emit('error', failure); }, function (error) { return error === failure; });
  });
});
