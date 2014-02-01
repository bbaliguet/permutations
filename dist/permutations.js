/*! permutations - v0.1.0 - 2014-02-01
* https://github.com/benoit/permutations
* Copyright (c) 2014 Benoît Baliguet; Licensed MIT */
(function(exports) {

	'use strict';

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
			var nullTails = all(elements, size-1);
			for (var k = 0, l3 = nullTails.length; k<l3; k++) {
				var nullTail = nullTails[k];
				nullTail.unshift(null);
				permutations.push(nullTail);
			}
		}
		return permutations;
	};

	exports.all = all;

}(typeof exports === 'object' && exports || this));