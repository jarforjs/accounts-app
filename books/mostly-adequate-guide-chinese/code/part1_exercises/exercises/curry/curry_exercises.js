// require('../../support');
// var _ = require('ramda');


// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function

// var words = function(str) {
//   return split(' ', str);
// };
var words = split(' ');
console.log(words('hello world, hello everybody! hello girl!'), 'words')

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

// var sentences = undefined
var sentences = map(words);
console.log(sentences(['hello world','hell china!']), 'sentences')

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions

// var filterQs = function(xs) {
//   return filter(function(x){ return match(/q/i, x);  }, xs);
// };
var filterQs = filter(match(/q/i))
console.log(filterQs(['quick', 'camels', 'quarry', 'over', 'quails']), 'filterQs')

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any arguments

// LEAVE BE:
var _keepHighest = function(x,y){ return x >= y ? x : y; };

// REFACTOR THIS ONE:
// var max = function(xs) {
//   return reduce(function(acc, x){
//     return _keepHighest(acc, x);
//   }, 0, xs);
// };

var max = reduce(_keepHighest, -Infinity)
console.log(max([123,343,55,2,9999]), 'max')


// Bonus 1:
// ============
// wrap array's slice to be functional and curried.
// //[1,2,3].slice(0, 2)
// var slice = undefined;
var sliceArray = slice(0, 2);
console.log(sliceArray([1,2,3,4]), 'sliceArray')

// Bonus 2:
// ============
// use slice to define a function "take" that takes n elements. Make it curried
// var take = undefined;
var take = slice(0)
console.log(take(3,[2,3,4,5,6]),'take')

//
// module.exports = { words: words,
//                    sentences: sentences,
//                    filterQs: filterQs,
//                    max: max,
//                    slice: slice,
//                    take: take
//                  };
