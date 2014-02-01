/*
 * permutations
 * https://github.com/benoit/permutations
 *
 * Copyright (c) 2014 Benoît Baliguet
 * Licensed under the MIT license.
 */

(function(exports) {

	'use strict';

	// get all permutations at once
	var all = function(elements, size) {
		var permutations = [];
		if (!size) {
			return [[]];
		}
		for (var i = 0, l = elements.length; i < l; i++) {
			var copy = elements.slice(),
				start = copy.splice(i, 1)[0],
				tails = all(copy, size - 1);
			for (var j = 0, l2 = tails.length; j < l2; j++) {
				var tail = tails[j];
				tail.unshift(start);
				permutations.push(tail);
			}
		}
		if (elements.length < size) {
			var nullTails = all(elements, size - 1);
			for (var k = 0, l3 = nullTails.length; k < l3; k++) {
				var nullTail = nullTails[k];
				nullTail.unshift(null);
				permutations.push(nullTail);
			}
		}
		return permutations;
	};

	// get a generator for permutations
	var _generator = function(elements, size) {
		var index = 0,
			generators = [];
		for (var i = 0, l = elements.length; i < l; i++) {
			var copy = elements.slice(),
				start = copy.splice(i, 1)[0];
			generators.push({
				start: start,
				tail: _generator(copy, size - 1).next
			});
		}
		if (elements.length < size) {
			generators.push({
				start: null,
				tail: _generator(elements.slice(), size - 1).next
			});
		}
		var nbGen = generators.length;

		return {
			next: function(skip) {
				var result = {};
				if (!size) {
					return {
						permutation: [],
						shift: true
					};
				}
				// adjust index depending on skip
				if (!skip) {
					index++;
					if (index === nbGen) {
						index = 0;
						result.shift = true;
					}
				}
				if (skip < 0) {
					index = 0;
				}
				var generator = generators[index],
					permutationResult = generator.tail(skip - 1),
					permutation = permutationResult.permutation;
				permutation.unshift(generator.start);
				result.permutation = permutation;
				if (permutationResult.shift) {
					index++;
				}
				if (index === nbGen) {
					index = 0;
					result.shift = true;
				}
				return result;
			}
		};
	};

	// requirejs style
	if (typeof define === 'function') {
		exports = {};
	}

	// API
	exports.all = all;
	exports.generator = function(elements, size) {
		var gen = _generator(elements, size);
		return {
			next: function(skip) {
				if (!skip && skip !== 0) {
					// skip never happens
					skip = elements.length + 1;
				}
				return gen.next(skip).permutation;
			}
		};
	};

	// requirejs style
	if (typeof define === 'function') {
		define(exports);
	}

}(typeof exports === 'object' && exports || (this.permutations = {}, this.permutations)));