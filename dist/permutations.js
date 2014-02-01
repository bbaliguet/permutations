/*! permutations - v0.1.0 - 2014-02-01
* https://github.com/benoit/permutations
* Copyright (c) 2014 Benoît Baliguet; Licensed MIT */
(function(exports) {

	'use strict';

	// get all permutations at once
	var all = function(elements, size) {
		var permutations = [];
		if (size === 0) {
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
			next: function() {
				var result = {};
				if (size === 0) {
					return {
						permutation: [],
						shift: true
					};
				}
				var generator = generators[index],
					permutationResult = generator.tail(),
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

	// API
	exports.all = all;
	exports.generator = function(elements, size) {
		var gen = _generator(elements, size);
		return {
			next: function() {
				return gen.next().permutation;
			}
		};
	};

}(typeof exports === 'object' && exports || this));