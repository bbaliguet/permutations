'use strict';

var permutations = require('../lib/permutations.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['awesome'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'all permutations': function(test) {
    test.deepEqual(permutations.all([1, 2], 4), [
      [1, 2, null, null],
      [1, null, 2, null],
      [1, null, null, 2],
      [2, 1, null, null],
      [2, null, 1, null],
      [2, null, null, 1],
      [null, 1, 2, null],
      [null, 1, null, 2],
      [null, 2, 1, null],
      [null, 2, null, 1],
      [null, null, 1, 2],
      [null, null, 2, 1]
    ]);
    test.done();
  }
};