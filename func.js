// func - javascript utility library
// Brian Taylor Vann
// April 2018
// MIT License


// - errors -

const confirmArray = function funcConfirmArray(list) {
  "use strict";

  if (Array.isArray(list)) {
    return list;
  }

  throw new TypeError("Argument is not of type Array.");
}


const confirmInteger = function funcConfirmInteger(integer) {
  "use strict";

  if (Number.isInteger(integer)) {
    return integer;
  }

  throw new TypeError("Argument is not of type Integer.");
}


const confirmFunction = function funcConfirmFunction(func) {
  "use strict";

  if (func instanceof Function) {
    return func;
  }

  throw new TypeError("Argument is not of type Function.");
}


// - iterators -

const iterator = function funcIterator(arr) {
  "use strict";

  let list = confirmArray(arr);
  let index = -1;
  let complete = (arr.length === 0);

  return Object.freeze({
    done: function() {
      return complete;
    },

    step: function() {
      if (index < list.length) {
        index += 1;
        complete = (index > list.length - 2)

        return list[index];
      }
    }
  });
};


const reverseIterator = function funcReverseIterator(arr) {
  "use strict";

  let list = confirmArray(arr);
  let index = list.length;
  let complete = (arr.length === 0);

  return Object.freeze({
    done: function() {
      return complete;
    },

    step: function() {
      if (index > -1) {
        index -= 1;
        complete = (index < 1);

        return list[index];
      }
    }
  });
};


const times = function funcTimes(num, func) {
  "use strict";

  let freq = Math.max(0, confirmInteger(num));
  let fn = confirmFunction(func);

  while (freq > 0) {
    fn();
    freq -= 1;
  }
}


// - functors -

const each = function funcEach(arr, func) {
  "use strict";

  let listIter = iterator(arr);
  let fn = confirmFunction(func);

  while (!listIter.done()) {
    fn(listIter.step());
  }
};


const reverseEach = function funcReverseEach(arr, func) {
  "use strict";

  let listIter = reverseIterator(arr);
  let fn = confirmFunction(func);

  while (!listIter.done()) {
    fn(listIter.step());
  }
}


const enumerate = function funcEnumerate(arr, func, initial) {
  "use strict";

  let listIter = iterator(arr);
  let fn = confirmFunction(func);
  let index = 0;

  if(initial) {
    index = confirmInteger(initial);
  }

  while (!listIter.done()) {
    fn(index, listIter.step());
    index += 1;
  }
};


const map = function funcMap(arr, func) {
  "use strict";

  let list = confirmArray(arr);
  let fn = confirmFunction(func);

  let mapList = list.slice();

  enumerate(list, function(index, item) {
    mapList[index] = func(item);
  });

  return mapList;
};


const reduce = function funcReduce(list, func, initial) {
  "use strict";

  let listIter = iterator(list);
  let fn = confirmFunction(func);
  let accumulator = initial;

  if(typeof accumulator === "undefined") {
    accumulator = listIter.step();
  }

  while (!listIter.done()) {
    accumulator = fn(accumulator, listIter.step());
  }

  return accumulator;
};


const reverseReduce = function funcReverseReduce(list, func, initial) {
  "use strict";

  let listIter = reverseIterator(list);
  let fn = confirmFunction(func);
  let accumulator = initial;

  if(typeof accumulator === "undefined") {
    accumulator = listIter.step();
  }

  while (!listIter.done()) {
    accumulator = fn(accumulator, listIter.step());
  }

  return accumulator;
};


const filter = function funcFilter(list, func) {
  "use strict";

  let fn = confirmFunction(func);
  let filtered = [];

  each(list, function(item) {
    if (fn(item) === true) {
      filtered.push(item);
    }
  });

  return filtered;
};


const reject = function funcReject(list, func) {
  "use strict";

  let fn = confirmFunction(func);
  let rejected = [];

  each(list, function(item) {
    if (fn(item) === false) {
      rejected.push(item);
    }
  });

  return rejected;
};


// - qualitators -

const all = function funcAll(list, func) {
  "use strict";

  let listIter = iterator(list);
  let fn = confirmFunction(func);

  while (!listIter.done()) {
    if (fn(listIter.step()) === false) {
      return false;
    }
  }

  return true;
};


const any = function funcAny(list, func) {
  "use strict";

  let listIter = iterator(list);
  let fn = confirmFunction(func);

  while (!listIter.done()) {
    if (fn(listIter.step()) === true) {
      return true;
    }
  }

  return false;
};


const none = function funcNone(list, func) {
  "use strict";

  let listIter = iterator(list);
  let fn = confirmFunction(func);

  while (!listIter.done()) {
    if (fn(listIter.step()) === true) {
      return false;
    }
  }

  return true;
};


const count = function funcCount(list, func) {
  "use strict";

  let fn = confirmFunction(func);
  let tally = 0;

  each(list, function(item) {
    if (func(item) === true) {
      tally += 1;
    }
  });

  return tally;
}


// - higher functions -

const partial = function funcPartial() {
  "use strict";

  let func = confirmFunction(arguments[0]);
  let boundArgs = Array.from(arguments).slice(1, arguments.length);

  return function() {
    return func.apply(undefined, boundArgs.concat(Array.from(arguments)));
  }
}


const curry = function funcCurry(num, func) {
  "use strict";

  let times = confirmInteger(num);
  let fn = confirmFunction(func);

  let stock = [];

  let curried = function(item) {
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

  var curried = function() {
    stock = stock.concat(Array.from(arguments))
    if (stock.length < times) {
      return curried;
    }

    return fn.apply(undefined, stock);
  }

  return curried;
}


// - list factories -

const range = function funcRange() {
  let createRange = function(first, last, step, func) {
    let run = [];
    let curr = first;

    while (func(curr, last)) {
      run.push(curr);
      curr += step;
    }

    return run;
  }

  let lessThan = function(curr, last) {
    return curr < last;
  }

  let greaterThan = function(curr, last) {
    return curr > last;
  }

  let first = 0;
  let last = 0;
  let step = 1;
  let fn = lessThan;

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


var shuffle = function(list) {
  var deck = list.slice();
  var i = 0;
  var j = deck.length - 1;
  var tmp;

  while (j > 1) {
    i = Math.floor(Math.random() * j);

    tmp = deck[j];
    deck[j] = deck[i];
    deck[i] = tmp;

    j -= 1;
  }

  return deck;
}


var sample = function(list, amount) {
  let total = (amount || 1);
  return shuffle(list).slice(0, total);
}


var bind = function(func, context) {
  return function() {
    func.apply(undefined, context);
  }
}



var unique = function(list) {
  if (!list || !list.length || !Array.isArray(list)) {
    return [];
  }

  var hashy = {};
  var uniqueList = [];

  each(list, function(item) {
    if (!hashy[item]) {
      hashy[item] = true;
      uniqueList.push(item);
    }
  });

  return uniqueList;
}


var flatten = function(list) {
  var flatList = [];
  var queue = [];
  var currIter;
  var item;

  queue.push(iterator(list));

  while(queue.length !== 0) {
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


var max = function(list, func) {
  var fn = func;

  if (!func) {
    fn = function(max, curr) {
      return max < curr ? curr : max
    }
  }

  return reduce(list, fn, list[0]);
}


var min = function(list, func) {
  var fn = func;

  if (!func) {
    fn = function(min, curr) {
      return curr < min ? curr : min
    }
  }

  return reduce(list, fn, list[0]);
}


var only = function(times, func) {
  var tally = 0;

  var onlyd = function() {
    if (tally < times - 1) {
      return func.apply(undefined, arguments);
    }

    tally += 1;
  }

  return onlyd;
}


var after = function(times, func) {
  var tally = times;

  var afterd = function() {
    if (tally < 1) {
      return func.apply(undefined, arguments);
    }

    tally -= 1;
  }

  return afterd;
}


var freeze = function(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(function(value) {
      if (typeof value === "object") {
        freeze(value);
      }
    });
    Object.freeze(obj);
  } else if (typeof obj === "object") {
    Object.keys(obj).forEach(function(key) {
      if (typeof obj[key] === "object") {
        freeze(obj[key]);
      }
    });
    Object.freeze(obj);
  }
}


// ridiculous

var print = function() {
  console.log.apply(undefined, arguments);
  return arguments;
}



export {
  iterator,
  reverseIterator,
  times,
  each,
  reverseEach,
  enumerate,
  map,
  reduce,
  reverseReduce,
  filter,
  reject,
  all,
  any,
  none,
  count,
  partial,
  curry,
  stretchCurry,
  range
}
