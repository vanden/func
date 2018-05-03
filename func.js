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


const isArrayType = (obj) => (Array.isArray(obj));


const isObjectType = (obj) => (
  typeof obj === "object"
    && Object.getPrototypeOf(obj) === Object.prototype
);


const isValidDupType = (obj) => (isArrayType(obj) || isObjectType(obj));


const duplicateArray = (obj) => (
  (isArrayType(obj))
    ? Object.assign([], obj)
    : obj
);

const duplicateObject = (obj) => (
  (isObjectType(obj))
    ? Object.assign({}, obj)
    : obj
);


// - iterators -

const iterator = (list) => {
  let index = -1;
  let complete = (confirmArray(list).length === 0);

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


const reverseIterator = (list) => {
  let index = confirmArray(list).length;
  let complete = (list.length === 0);

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


const times = (num, func) => {
  confirmFunction(func);

  let freq = Math.max(0, confirmInteger(num));

  while (freq > 0) {
    func();
    freq -= 1;
  }
}


// - functors -

const each = (list, func) => {
  confirmFunction(func);

  let listIter = iterator(list);

  while (!listIter.done()) {
    func(listIter.step());
  }
};


const reverseEach = (list, func) => {
  confirmFunction(func);

  let listIter = reverseIterator(list);

  while (!listIter.done()) {
    func(listIter.step());
  }
}


const enumerate = (list, func, index = 0) => {
  confirmFunction(func);
  confirmInteger(index)

  let listIter = iterator(list);

  while (!listIter.done()) {
    func(index, listIter.step());
    index += 1;
  }
};


const map = (list, func) => {
  confirmFunction(func);

  let mapList = confirmArray(list).slice();

  enumerate(list, (index, item) => {
    mapList[index] = func(item);
  });

  return mapList;
};


const reduce = (list, func, initial) => {
  confirmFunction(func);

  let listIter = iterator(list);
  let accumulator = (initial === undefined)
    ? listIter.step()
    : initial;

  while (!listIter.done()) {
    accumulator = func(accumulator, listIter.step());
  }

  return accumulator;
};


const reverseReduce = (list, func, initial) => {
  confirmFunction(func);

  let listIter = reverseIterator(list);
  let accumulator = (initial === undefined)
    ? listIter.step()
    : initial;

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
  confirmFunction(func);

  let listIter = iterator(list);

  while (!listIter.done()) {
    if (func(listIter.step()) === false) {
      return false;
    }
  }

  return true;
};


const any = (list, func) => {
  confirmFunction(func);

  let listIter = iterator(list);

  while (!listIter.done()) {
    if (func(listIter.step()) === true) {
      return true;
    }
  }

  return false;
};


const none = (list, func) => {
  confirmFunction(func);

  let listIter = iterator(list);

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


const max = (list, func) => {
  let fn = (func)
    ? confirmFunction(func)
    : (max, curr) => (max < curr);

  let maxFunc = function(max, curr) {
    return fn(max, curr)
      ? curr
      : max;
  }

  return reduce(confirmArray(list), maxFunc, list[0]);
}


const min = (list, func) => {
  let fn = (func)
    ? confirmFunction(func)
    : (min, curr) => (min > curr);

  let minFunc = function(min, curr) {
    return fn(min, curr)
      ? curr
      : min;
  }

  return reduce(confirmArray(list), minFunc, list[0]);
}


// - higher functions -

const partial = (func, ...args) => {
  confirmFunction(func);

  return (...rest) => (func(...args, ...rest));
}


const curry = (count, func) => {
  confirmInteger(count);
  confirmFunction(func);

  let stock = [];

  let curried = (item) => {
    stock.push(item);

    if (stock.length < count) {
      return curried;
    }

    return func(...stock);
  }

  return curried;
}


const stretchCurry = (count, func) => {
  confirmInteger(count);
  confirmFunction(func);

  let stock = [];

  let curried = (...rest) => {
    stock = [...stock, ...rest];

    if (stock.length < count) {
      return curried;
    }

    return func(...stock);
  }

  return curried;
}


const only = (tally, func) => {
  confirmInteger(tally);
  confirmFunction(func);

  let onlyd = (...rest) => {
    if (tally > 0) {
      tally -= 1;
      return func(...rest);
    }
  }

  return onlyd;
}


const after = (tally, func) => {
  confirmInteger(tally);
  confirmFunction(func);

  let afterd = (...rest) => {
    if (tally < 1) {
      return func(...rest);
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
    (last < first)
      ? greaterThan
      : lessThan
  );
}


const shuffle = (list) => {
  let deck = confirmArray(list).slice();
  let index = deck.length - 1;

  while (index > 1) {
    let randomIndex = Math.floor(Math.random() * index);
    [deck[index], deck[randomIndex]] = [deck[randomIndex], deck[index]]
    index -= 1;
  }

  return deck;
}


const sample = (list, count) => {
  return shuffle(confirmArray(list)).slice(0, confirmInteger(count));
}


const unique = (list) => {
  let hashy = {};
  let uniqueList = [];

  each(confirmArray(list), (item) => {
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
  let freezeRecurse = (obj) => {
    Object.getOwnPropertyNames(obj).forEach((key) => {
      if (isValidDupType(obj[key])) {
        freezeRecurse(obj[key]);
      }
    });

    return Object.freeze(obj);
  }

  return (isValidDupType(obj))
    ? freezeRecurse(obj)
    : obj;
}


const bigDup = (obj) => {
  let duplicateRecurse = (obj) => {
    Object.getOwnPropertyNames(obj).forEach((key) => {
      if (isValidDupType(obj[key])) {
        obj[key] = duplicateRecurse(duplicateObject(duplicateArray(obj[key])));
      }
    });

    return obj
  }

  return (isValidDupType(obj))
    ? duplicateRecurse(obj)
    : obj;
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
