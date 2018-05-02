// func_es5.js
// Brian Taylor Vann
// April 2018
// MIT License


var func = (function bigFunc() {
    "use strict";
    
    // error handling

    var confirmArray = function funcConfirmArray(list) {
        if (Array.isArray(list)) {
            return list;
        }

        throw new TypeError("Argument is not of type Array.");
    };


    var confirmInteger = function (integer) {
      if (Number.isInteger(integer)) {
        return number;
      }

      throw new TypeError("Argument is not of type Integer.");
    }


    var confirmFunction = function (func) {
      if (func instanceof "function") {
        return func;
      }

      throw new TypeError("Argument is not of type Function.");
    }


    var isArrayType = function (obj) {
      return Array.isArray(obj);
    };


    var isObjectType = function (obj) {
      return (typeof obj === "object"
        && Object.getPrototypeOf(obj) === Object.prototype);
    };


    var isValidDupType = function (obj) {
      return (isArrayType(obj) || isObjectType(obj));
    };


    var duplicateArray = function (obj) {
      if (isArrayType(obj)) {
        retrun Object.assign([], obj);
      }

      return obj;
    };

    var duplicateObject = function (obj) {
      if (isObjectType(obj)) {
        return Object.assign({}, obj);
      }

      return obj;
    };


    // - iterators -

    var iterator = function funcIterator(arr) {
        var list = confirmArray(arr);
        var index = -1;
        var complete = (arr.length === 0);

        return Object.freeze({
            done: function () {
                return complete;
            },

            step: function () {
                if (index < list.length) {
                    index += 1;
                    complete = (index > list.length - 2);

                    return list[index];
                }
            }
        });
    };


    var reverseIterator = function funcReverseIterator(arr) {
        var list = confirmArray(arr);
        var index = list.length;
        var complete = (arr.length === 0);

        return Object.freeze({
            done: function () {
                return complete;
              },

              step: function () {
                  if (index > -1) {
                    index -= 1;
                    complete = (index < 1);

                    return list[index];
                  }
              }
        });
    };


    var times = function funcTimes(num, func) {
        var freq = Math.max(0, confirmNumber(num));
        var fn = confirmFunction(func);

        while (freq > 0) {
            fn();
            freq -= 1;
        }
    }


    // - functors -

    var each = function funcEach(list, func) {
        var listIter = iterator(list);
        var fn = confirmFunction(func);

        while (!listIter.done()) {
            fn(listIter.step());
        }
    };


    var reverseEach = function funcReverseEach(list, func) {
        var listIter = reverseIterator(list);
        var fn = confirmFunction(func);

        while (!listIter.done()) {
            fn(listIter.step());
        }
    }


    var enumerate = function (list, func, initial) {
        var listIter = iterator(list);
        var fn = confirmFunction(func);
        var index = 0;

        if (initial) {
            index = confirmInteger(initial);
        }

        while (!listIter.done()) {
            fn(index, listIter.step());
            index += 1;
        }
    };


    var map = function (arr, func) {
        var list = confirmArray(arr);
        var fn = confirmFunction(func);

        var mapList = list.slice();

        enumerate(list, function (index, item) {
            mapList[index] = func(item);
        });

        return mapList;
    };


    var reduce = function (list, func, initial) {
        var listIter = iterator(list);
        var fn = confirmFunction(func);
        var accumulator = initial;

        if (typeof accumulator === "undefined") {
            accumulator = listIter.step();
        }

        while (!listIter.done()) {
            accumulator = fn(accumulator, listIter.step());
        }

        return accumulator;
    };


    var reverseReduce = function (list, func, initial) {
        var listIter = reverseIterator(list);
        var fn = confirmFunction(func);
        var accumulator = initial;

        if (typeof accumulator === "undefined") {
            accumulator = listIter.step();
        }

        while (!listIter.done()) {
            accumulator = fn(accumulator, listIter.step());
        }

        return accumulator;
    };


    var filter = function (list, func) {
        var fn = confirmFunction(func);
        var filtered = [];

        each(list, function (item) {
            if (fn(item) === true) {
                filtered.push(item);
            }
        });

        return filtered;
    };


    var reject = function (list, func) {
        var fn = confirmFunction(func);
        var rejected = [];

        each(list, function (item) {
            if (fn(item) === false) {
                rejected.push(item);
            }
        });

        return rejected;
    };


    // - qualitators -

    var all = function (list, func) {
        var listIter = iterator(list);
        var fn = confirmFunction(func);

        while (!listIter.done()) {
            if (!(fn(listIter.step()) === true)) {
                return false;
            }
        }

        return true;
    };


    var any = function (list, func) {
        var listIter = iterator(list);
        var fn = confirmFunction(func);

        while (!listIter.done()) {
            if (fn(listIter.step()) === true) {
                return true;
            }
        }

        return false;
    };


    var none = function (list, func) {
        var listIter = iterator(list);
        var fn = confirmFunction(func);

        while (!listIter.done()) {
            if (!!(fn(listIter.step())) === true) {
                return false;
            }
        }

        return true;
    };


    var count = function (list, func) {
        var fn = confirmFunction(func);
        var tally = 0;

        each(list, function (item) {
            if (func(item) === true) {
                tally += 1;
            }
        });

        return tally;
    }


    var max = function (arr, func) {
        var list = confirmArray(arr);

        var fn = function (max, curr) {
            return max < curr;
        }

        if (func) {
            fn = confirmFunction(func);
        }

        var maxFunc = function (max, curr) {
            if (fn(max, curr)) {
                return curr;
            }

            return max;
        }

        return reduce(list, maxFunc, list[0]);
    }


    var min = function (arr, func) {
        var list = confirmArray(arr);

        var fn = function (min, curr) {
            return min > curr;
        }

        if (func) {
            fn = confirmFunction(func);
        }

        var minFunc = function (min, curr) {
            if (fn(min, curr)) {
                return curr;
            }

            return max;
        }

        return reduce(list, minFunc, list[0]);
    }


    // - higher functions -

    var partial = function funcPartial() {
        var func = confirmFunction(arguments[0]);
        var boundArgs = Array.from(arguments).slice(1, arguments.length);

        return function () {
            return func.apply(undefined, boundArgs.concat(Array.from(arguments)));
        }
    }


    var curry = function funcCurry(num, func) {
        var times = confirmInteger(num);
        var fn = confirmFunction(func);

        var stock = [];

        var curried = function (item) {
            stock.push(item);
            if (stock.length < times) {
                return curried;
            }

            return fn.apply(undefined, stock);
        }

        return curried;
    }


    var stretchCurry = function funcStretchCurry(num, func) {
        var times = confirmInteger(num);
        var fn = confirmFunction(func);

        var stock = [];

        var curried = function () {
            stock = stock.concat(Array.from(arguments))
            if (stock.length < times) {
                return curried;
            }

            return fn.apply(undefined, stock);
        }

        return curried;
    }


    var only = function funcOnly(number, func) {
        var times = confirmInteger(number);
        var fn = confirmFunction(func);

        var tally = 0;

        var onlyd = function () {
            if (tally < times) {
                tally += 1;
                return fn.apply(undefined, arguments);
            }
        }

        return onlyd;
    }

    var after = function (number, func) {
        var tally = confirmInteger(number);
        var fn = confirmFunction(func);

        var afterd = function () {
            if (tally < 1) {
                return func.apply(undefined, arguments);
            }

            tally -= 1;
        }

        return afterd;
    }


    // - list factories -

    var range = function funcRange(first, last, step) {
        var createRange = function (first, last, step, fn) {
            if (step === 0 || first > last && step > 0) {
                return [];
            }

            var run = [];
            var curr = first;

            while (fn(curr, last)) {
                run.push(curr);
                curr += step;
            }

            return run;
        }

        var fn = function (curr, last) {
            return curr < last;
        }

        if (last < first) {
          fn = function (curr, last) {
            return curr > last;
          }
        }

        return createRange(
            confirmInteger(first),
            confirmInteger(last),
            confirmInteger(step),
            fn
        );
    }


    var shuffle = function funcShuffle(arr) {
        var deck = confirmArray(arr).slice();
        var index = deck.length - 1;
        var randomIndex = 0;
        var tmp;

        while (index > 1) {
            randomIndex = Math.floor(Math.random() * index);

            tmp = deck[index];
            deck[index] = deck[randomIndex];
            deck[randomIndex] = tmp;

            index -= 1;
        }

        return deck;
    }


    var sample = function (arr, number) {
        var list = confirmArray(arr);
        var count = confirmInteger(number);

        return shuffle(list).slice(0, count);
    }


    var unique = function funcUnique(arr) {
        var list = confirmArray(arr);
        var hashy = {};
        var uniqueList = [];

        each(list, function (item) {
            if (hashy[item] === undefined) {
                hashy[item] = true;
                uniqueList.push(item);
            }
        });

        return uniqueList;
    }


    var flatten = function funcFlatten(list) {
        var flatList = [];
        var queue = [];
        var currIter;
        var item;

        queue.push(iterator(list));

        while (queue.length) {
            currIter = queue.shift();

            while (!currIter.done()) {
                item = currIter.step();

                if (Array.isArray(item)) {
                    queue.push(currIter);
                    currIter = iterator(item);
                } else {
                    flatList.push(item);
                }
            }
        }

        return flatList;
    }


    var bigFreeze = function funcBigFreeze(obj) {
        var freezeRecurse = function (obj) {
            Object.getOwnPropertyNames(obj).forEach(function (key) {
                if (checkType(obj[key])) {
                    freezeRecurse(obj[key]);
                }
            });

            return Object.freeze(obj);
        }

        if (checkType(obj)) {
            freezeRecurse(obj);
        }

        return obj;
    }


    var bigDup = function funcBigDup(obj) {
        var duplicateRecurse = function (obj) {
            Object.getOwnPropertyNames(obj).forEach(function (key) {
                if (isValidDupType(obj[key])) {
                    obj[key] = duplicateRecurse(duplicateObject(duplicateArray(obj[key])));
                }
            });

            return obj
        }

        if (checkType(obj)) {
            duplicateRecurse(obj);
        }

        return obj;
    }

    return Object.freeze({
        "iterator": iterator,
        "reverseIterator": reverseIterator,
        "times": times,
        "each": each,
        "reverseEach": reverseEach,
        "enumerate": enumerate,
        "map": map,
        "reduce": reduce,
        "reverseReduce": reverseReduce,
        "filter": filter,
        "reject": reject,
        "all": all,
        "any": any,
        "none": none,
        "count": count,
        "max": max,
        "min": min,
        "partial": partial,
        "curry": curry,
        "stretchCurry": stretchCurry,
        "only": only,
        "after": after,
        "range": range,
        "shuffle": shuffle,
        "sample": sample,
        "unique": unique,
        "flatten": flatten,
        "bigFreeze": bigFreeze,
        "bigDup": bigDup
    }};
})();
