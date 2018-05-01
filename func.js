// func - javascript utility library
// Brian Taylor Vann
// April 2018
// MIT License


// - errors -

const confirmArray = (list) => (
  (Array.isArray(list))
    ? list
    : throw new TypeError("Argument is not of type Array.");
);


const confirmInteger = (integer) => (
  (Number.isInteger(integer))
    ? list
    : throw new TypeError("Argument is not of type Integer.");
);


const confirmFunction = (func) => (
  (func instanceof Function)
    ? func
    : throw new TypeError("Argument is not of type Function.");
);


// - iterators -

const iterator = function funcIterator(arr) {
  let list = confirmArray(arr);
  let index = -1;
  let complete = (arr.length === 0);

  return Object.freeze({
    done: function () {
      return complete;
    },

    step: function () {
      if (index < list.length) {
        index += 1;
        complete = (index > list.length - 2)

        return list[index];
      }
    }
  });
};


const reverseIterator = function funcReverseIterator(arr) {
  let list = confirmArray(arr);
  let index = list.length;
  let complete = (arr.length === 0);

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


const times = function funcTimes(num, func) {
  let freq = Math.max(0, confirmInteger(num));
  let fn = confirmFunction(func);

  while (freq > 0) {
    fn();
    freq -= 1;
  }
}


// - functors -

const each = function funcEach(arr, func) {
  let listIter = iterator(arr);
  let fn = confirmFunction(func);

  while (!listIter.done()) {
    fn(listIter.step());
  }
};


const reverseEach = function funcReverseEach(arr, func) {
  let listIter = reverseIterator(arr);
  let fn = confirmFunction(func);

  while (!listIter.done()) {
    fn(listIter.step());
  }
}


const enumerate = function funcEnumerate(arr, func, initial) {
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
  let list = confirmArray(arr);
  let fn = confirmFunction(func);

  let mapList = list.slice();

  enumerate(list, function (index, item) {
    mapList[index] = func(item);
  });

  return mapList;
};


const reduce = function funcReduce(list, func, initial) {
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
  let listIter = reverseIterator(list);
  let fn = confirmFunction(func);
  let accumulator = initial;

  if (typeof accumulator === "undefined") {
    accumulator = listIter.step();
  }

  while (!listIter.done()) {
    accumulator = fn(accumulator, listIter.step());
  }

  return accumulator;
};


const filter = function funcFilter(list, func) {
  let fn = confirmFunction(func);
  let filtered = [];

  each(list, function (item) {
    if (fn(item) === true) {
      filtered.push(item);
    }
  });

  return filtered;
};


const reject = function funcReject(list, func) {
  let fn = confirmFunction(func);
  let rejected = [];

  each(list, function (item) {
    if (fn(item) === false) {
      rejected.push(item);
    }
  });

  return rejected;
};


// - qualitators -

const all = function funcAll(list, func) {
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
  let fn = confirmFunction(func);
  let tally = 0;

  each(list, function (item) {
    if (func(item) === true) {
      tally += 1;
    }
  });

  return tally;
}


const max = function (arr, func) {
  let list = confirmArray(arr);

  let fn = (func)
    ? confirmFunction(func)
    : function (max, curr) { return max < curr; }

  let maxFunc = function(max, curr) {
    return fn(max, curr)
      ? curr
      : max;
  }

  return reduce(list, maxFunc, list[0]);
}


const min = function (arr, func) {
  let list = confirmArray(arr);

  let fn = (func)
    ? confirmFunction(func)
    : function (min, curr) { return min > curr; }

  let minFunc = function(min, curr) {
    return fn(min, curr)
      ? curr
      : min;
  }

  return reduce(list, minFunc, list[0]);
}


// - higher functions -

const partial = function funcPartial() {
  let func = confirmFunction(arguments[0]);
  let boundArgs = Array.from(arguments).slice(1, arguments.length);

  return function () {
    return func.apply(undefined, boundArgs.concat(Array.from(arguments)));
  }
}


const curry = function funcCurry(num, func) {
  let times = confirmInteger(num);
  let fn = confirmFunction(func);

  let stock = [];

  let curried = function (item) {
    stock.push(item);

    if (stock.length < times) {
      return curried;
    }

    return fn.apply(undefined, stock);
  }

  return curried;
}


const stretchCurry = function funcStretchCurry(num, func) {
  let times = confirmInteger(num);
  let fn = confirmFunction(func);

  let stock = [];

  let curried = function () {
    stock = stock.concat(Array.from(arguments));

    if (stock.length < times) {
      return curried;
    }

    return fn.apply(undefined, stock);
  }

  return curried;
}


var only = function (times, func) {
  var tally = 0;

  var onlyd = function () {
    if (tally < times - 1) {
      return func.apply(undefined, arguments);
    }

    tally += 1;
  }

  return onlyd;
}


var after = function (times, func) {
  var tally = times;

  var afterd = function () {
    if (tally < 1) {
      return func.apply(undefined, arguments);
    }

    tally -= 1;
  }

  return afterd;
}


// - list factories -

const range = function funcRange() {
  let createRange = function (first, last, step, func) {
    let run = [];
    let curr = first;

    while (func(curr, last)) {
      run.push(curr);
      curr += step;
    }

    return run;
  }

  let lessThan = function (curr, last) {
    return curr < last;
  }

  let greaterThan = function (curr, last) {
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


const shuffle = function funcShuffle(arr) {
  let deck = confirmArray(arr).slice();
  let index = deck.length - 1;

  while (index > 1) {
    let randomIndex = Math.floor(Math.random() * index);

    let tmp = deck[index];
    deck[index] = deck[randomIndex];
    deck[randomIndex] = tmp;

    index -= 1;
  }

  return deck;
}


const sample = function funcSample(arr, number) {
  let list = confirmArray(arr);
  let count = confirmInteger(number);

  return shuffle(list).slice(0, count);
}


const unique = function funcUnique(arr) {
  let list = confirmArray(arr);
  let hashy = {};
  let uniqueList = [];

  each(list, function (item) {
    if (hashy[item] === undefined) {
      hashy[item] = true;
      uniqueList.push(item);
    }
  });

  return uniqueList;
}


const flatten = function funcFlatten(list) {
  let flatList = [];
  let queue = [];

  queue.push(iterator(list));

  while (queue.length) {
    let currIter = queue.shift();

    while (!currIter.done()) {
      let item = currIter.step();

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


var freeze = function (obj) {
  if (Array.isArray(obj)) {
    obj.forEach(function (value) {
      if (typeof value === "object") {
        freeze(value);
      }
    });
    Object.freeze(obj);
  } else if (typeof obj === "object") {
    Object.keys(obj).forEach(function (key) {
      if (typeof obj[key] === "object") {
        freeze(obj[key]);
      }
    });
    Object.freeze(obj);
  }
}


// ridiculous

var print = function () {
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
  max,
  min,
  partial,
  curry,
  stretchCurry,
  only,
  after,
  range,
  shuffle,
  sample,
  unique,
  flatten
}
