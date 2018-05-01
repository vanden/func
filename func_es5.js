// func.js
// Brian Taylor Vann
// April 2018
// MIT License


var confirmArray = function funcConfirmArray(list) {
    "use strict";

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


// - iterators -

var iterator = function funcIterator(arr) {
    "use strict";

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
    "use strict";

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
    "use strict";

    var freq = Math.max(0, confirmNumber(num));
    var fn = confirmFunction(func);

    while (freq > 0) {
        fn();
        freq -= 1;
    }
}


// - functors -

var each = function funcEach(list, func) {
    "use strict";

    var listIter = iterator(list);
    var fn = confirmFunction(func);

    while (!listIter.done()) {
        fn(listIter.step());
    }
};


var reverseEach = function funcReverseEach(list, func) {
    "use strict";

    var listIter = reverseIterator(list);
    var fn = confirmFunction(func);

    while (!listIter.done()) {
        fn(listIter.step());
    }
}


var enumerate = function (list, func, initial) {
    "use strict";

    var listIter = iterator(list);
    var fn = confirmFunction(func);
    var index = 0;

    if(initial) {
        index = confirmInteger(initial);
    }

    while (!listIter.done()) {
        fn(index, listIter.step());
        index += 1;
    }
};


var map = function (arr, func) {
    "use strict";

    var list = confirmArray(arr);
    var fn = confirmFunction(func);

    var mapList = list.slice();

    enumerate(list, function (index, item) {
        mapList[index] = func(item);
    });

    return mapList;
};


var reduce = function (list, func, initial) {
    "use strict";

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
    "use strict";

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
    "use strict";

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
    "use strict";

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
    "use strict";

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
    "use strict";

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
    "use strict";

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
    "use strict";

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
    "use strict";

    var list = confirmArray(arr);

    var fn = (func)
        ? confirmFunction(func)
        : function (max, curr) { return max < curr; }

    var maxFunc = function(max, curr) {
        return fn(max, curr)
            ? curr
            : max;
    }

    return reduce(list, maxFunc, list[0]);
}


var min = function (arr, func) {
    "use strict";

    var list = confirmArray(arr);

    var fn = (func)
        ? confirmFunction(func)
        : function (min, curr) { return min > curr; }

    var minFunc = function(min, curr) {
        return fn(min, curr)
            ? curr
            : min;
    }

    return reduce(list, minFunc, list[0]);
}


// - higher functions -

var partial = function funcPartial() {
    "use strict";

    var func = confirmFunction(arguments[0]);
    var boundArgs = Array.from(arguments).slice(1, arguments.length);

    return function () {
        return func.apply(undefined, boundArgs.concat(Array.from(arguments)));
    }
}


var curry = function funcCurry(num, func) {
    "use strict";

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
    "use strict";

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


// - list factories -

var range = function funcRange() {
    var createRange = function (first, last, step, func) {
        var run = [];
        var curr = first;

        while (func(curr, last)) {
            run.push(curr);
            curr += step;
        }

        return run;
    }

    var lessThan = function (curr, last) {
        return curr < last;
    }

    var greaterThan = function (curr, last) {
        return curr > last;
    }

    var first = 0;
    var last = 0;
    var step = 1;
    var fn = lessThan;

    if (arguments.length === 1) {
        last = confirmInteger(arguments[0]);
    }

    if (arguments.length === 2) {
        first = confirmInteger(arguments[0]);
        last = confirmInteger(arguments[1]);
    }

    if (arguments.length === 3) {
        first = confirmInteger(arguments[0]);
        last = confirmInteger(arguments[1]);
        step = confirmInteger(arguments[2]);
    }

    if (step === 0 || (first > last && step > 0)) {
        return [];
    }

    if (first > last) {
        fn = greaterThan;
    }

    return createRange(first, last, step, fn);
}


var shuffle = function funcShuffle(arr) {
    "use strict";

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
    "use strict";

    var list = confirmArray(arr);
    var count = confirmInteger(number);

    return shuffle(list).slice(0, count);
}


var const unique = function funcUnique(arr) {
    "use strict";

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
    "use strict";

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


var only = function funcOnly(number, func) {
    "use strict";

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
