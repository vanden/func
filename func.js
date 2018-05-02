// func - javascript utility library
// Brian Taylor Vann
// April 2018
// MIT License


// - error handling -

const confirmArray = (list) => {
  if (Array.isArray(list)) {
    return list;
  }

  throw new TypeError("Argument is not of type Array.")
};

const confirmInteger = (integer) => {
  if (Number.isInteger(integer)) {
    return integer;
  }

  throw new TypeError("Argument is not of type Integer.")
};

const confirmFunction = (func) => {
  if (func instanceof Function) {
    return func;
  }

  throw new TypeError("Argument is not of type Function.")
};


// - iterators -

const iterator = (arr) => {
  confirmArray(arr);
  let index = -1;
  let complete = (arr.length === 0);

  return Object.freeze({
    done: function () {
      return complete;
    },

    step: function () {
      if (index < arr.length) {
        index += 1;
        complete = (index > arr.length - 2)

        return arr[index];
      }
    }
  });
};


const reverseIterator = (arr) => {
  confirmArray(arr);
  let index = arr.length;
  let complete = (arr.length === 0);

  return Object.freeze({
    done: function () {
      return complete;
    },

    step: function () {
      if (index > -1) {
        index -= 1;
        complete = (index < 1);

        return arr[index];
      }
    }
  });
};


const times = (num, func) => {
  let freq = Math.max(0, confirmInteger(num));
  let fn = confirmFunction(func);

  while (freq > 0) {
    fn();
    freq -= 1;
  }
}


// - functors -

const each = (arr, func) => {
  let listIter = iterator(arr);
  let fn = confirmFunction(func);

  while (!listIter.done()) {
    fn(listIter.step());
  }
};


const reverseEach = (arr, func) => {
  let listIter = reverseIterator(arr);
  let fn = confirmFunction(func);

  while (!listIter.done()) {
    fn(listIter.step());
  }
}


const enumerate = (arr, func, initial = 0) => {
  let listIter = iterator(arr);
  let fn = confirmFunction(func);
  let index = confirmInteger(initial);

  while (!listIter.done()) {
    fn(index, listIter.step());
    index += 1;
  }
};


const map = (arr, func) => {
  confirmArray(arr);
  confirmFunction(func);

  let mapList = arr.slice();

  enumerate(arr, (index, item) => {
    mapList[index] = func(item);
  });

  return mapList;
};


const reduce = (list, func, initial) => {
  let listIter = iterator(list);
  confirmFunction(func);
  let accumulator = initial;

  if(accumulator === undefined) {
    accumulator = listIter.step();
  }

  while (!listIter.done()) {
    accumulator = func(accumulator, listIter.step());
  }

  return accumulator;
};


const reverseReduce = (list, func, initial) => {
  let listIter = reverseIterator(list);
  confirmFunction(func);
  let accumulator = initial;

  if (accumulator === undefined) {
    accumulator = listIter.step();
  }

  while (!listIter.done()) {
    accumulator = func(accumulator, listIter.step());
  }

  return accumulator;
};


const filter = (list, func) => {
  confirmFunction(func);
  let filtered = [];

  each(list, (item) => {
    if (func(item) === true) {
      filtered.push(item);
    }
  });

  return filtered;
};


const reject = (list, func) => {
  confirmFunction(func);
  let rejected = [];

  each(list, (item) => {
    if (func(item) === false) {
      rejected.push(item);
    }
  });

  return rejected;
};


// - qualitators -

const all = (list, func) => {
  let listIter = iterator(list);
  confirmFunction(func);

  while (!listIter.done()) {
    if (func(listIter.step()) === false) {
      return false;
    }
  }

  return true;
};


const any = (list, func) => {
  let listIter = iterator(list);
  confirmFunction(func);

  while (!listIter.done()) {
    if (func(listIter.step()) === true) {
      return true;
    }
  }

  return false;
};


const none = (list, func) => {
  let listIter = iterator(list);
  confirmFunction(func);

  while (!listIter.done()) {
    if (func(listIter.step()) === true) {
      return false;
    }
  }

  return true;
};


const count = (list, func) => {
  confirmFunction(func);
  let tally = 0;

  each(list, (item) => {
    if (func(item) === true) {
      tally += 1;
    }
  });

  return tally;
}


const max = (arr, func) => {
  confirmArray(arr);

  let fn = (func)
    ? confirmFunction(func)
    : (max, curr) => (max < curr);

  let maxFunc = function(max, curr) {
    return fn(max, curr)
      ? curr
      : max;
  }

  return reduce(arr, maxFunc, arr[0]);
}


const min = (arr, func) => {
  confirmArray(arr);

  let fn = (func)
    ? confirmFunction(func)
    : (min, curr) => (min > curr);

  let minFunc = function(min, curr) {
    return fn(min, curr)
      ? curr
      : min;
  }

  return reduce(arr, minFunc, arr[0]);
}


// - higher functions -

const partial = (func, ...args) => {
  confirmFunction(func);

  return (...rest) => (func(...args, ...rest));
}


const curry = (num, func) => {
  let times = confirmInteger(num);
  confirmFunction(func);

  let stock = [];

  let curried = (item) => {
    stock.push(item);

    if (stock.length < times) {
      return curried;
    }

    return func(...stock);
  }

  return curried;
}


const stretchCurry = (num, func) => {
  let times = confirmInteger(num);
  confirmFunction(func);

  let stock = [];

  let curried = (...rest) => {
    stock = [...stock, ...rest];

    if (stock.length < times) {
      return curried;
    }

    return func(...stock);
  }

  return curried;
}


const only = (number, func) => {
  let times = confirmInteger(number);
  confirmFunction(func);

  let tally = 0;

  let onlyd = (...rest) => {
    if (tally < times) {
      tally += 1;
      return func(...rest);
    }
  }

  return onlyd;
}


const after = (number, func) => {
  let tally = confirmInteger(number);
  let fn = confirmFunction(func);

  let afterd = (...rest) => {
    if (tally < 1) {
      return fn(...rest);
    }

    tally -= 1;
  }

  return afterd;
}


// - list factories -

const range = (first, last, step) => {
  let createRange = (first, last, step, func) => {
    if (step === 0 || (first > last && step > 0)) {
      return [];
    }

    let run = [];
    let curr = first;

    while (func(curr, last)) {
      run.push(curr);
      curr += step;
    }

    return run;
  }

  let lessThan = (curr, last) => (curr < last);
  let greaterThan = (curr, last) => (curr > last);

  return createRange(
    confirmInteger(first),
    confirmInteger(last),
    confirmInteger(step),
    (last < first) ? greaterThan : lessThan
  );
}


const shuffle = (arr) => {
  let deck = confirmArray(arr).slice();
  let index = deck.length - 1;

  while (index > 1) {
    let randomIndex = Math.floor(Math.random() * index);
    [deck[index], deck[randomIndex]] = [deck[randomIndex], deck[index]]
    index -= 1;
  }

  return deck;
}


const sample = (arr, number) => {
  let list = confirmArray(arr);
  let count = confirmInteger(number);

  return shuffle(list).slice(0, count);
}


const unique = (arr) => {
  let list = confirmArray(arr);
  let hashy = {};
  let uniqueList = [];

  each(list, (item) => {
    if (hashy[item] === undefined) {
      hashy[item] = true;
      uniqueList.push(item);
    }
  });

  return uniqueList;
}


const flatten = (list) => {
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


const bigFreeze = (obj) => {
  let checkType = (obj) => {
    if (Array.isArray(obj)) {
      return true;
    }

    if (typeof obj === "object" && Object.getPrototypeOf(obj) === Object.prototype) {
      return true;
    }

    return false;
  }

  let freezeRecurse = (obj) => {
    Object.getOwnPropertyNames(obj).forEach((key) => {
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


const bigDup = (obj) => {
  let checkType = (obj) => {
    if (Array.isArray(obj)) {
      return true;
    }

    if (typeof obj === "object" && Object.getPrototypeOf(obj) === Object.prototype) {
      return true;
    }

    return false;
  }

  let duplicateType = (obj) => {
    if (Array.isArray(obj)) {
      return Object.assign([], obj);
    }

    if (typeof obj === "object" && Object.getPrototypeOf(obj) === Object.prototype) {
      return Object.assign({}, obj);
    }

    return obj;
  }

  let duplicateRecurse = (obj) => {
    Object.getOwnPropertyNames(obj).forEach((key) => {
      if (checkType(obj[key])) {
        obj[key] = duplicateType(obj[key]);
        duplicateRecurse(obj[key]);
      }
    });
  }

  if (checkType(obj)) {
    duplicateRecurse(obj);
  }

  return obj;
}



// Export Modules

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
  flatten,
  bigFreeze,
  bigDup
}
