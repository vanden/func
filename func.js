// func.js
// Brian Taylor Vann
// April 2018
// MIT License


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

const each = function funcEach(list, func) {
  "use strict";

  let listIter = iterator(list);
  let fn = confirmFunction(func);

  while (!listIter.done()) {
    fn(listIter.step());
  }
};


var reverseEach = function funcReverseEach(list, func) {
  "use strict";

  let listIter = reverseIterator(list);
  let fn = confirmFunction(func);

  while (!listIter.done()) {
    fn(listIter.step());
  }
}


var enumerate = function(list, func, initial) {
  var listIter = iterator(list);
  var fn = confirmFunction(func);
  var index = (initial || 0);

  while (!listIter.done()) {
    fn(index++, listIter.step());
  }
};


var map = function(list, func) {
  var mapList = [];

  each(list, function(item, index) {
    mapList.push(func(item, index));
  });

  return mapList;
};


var reduce = function(list, func, initial) {
  var listIter = iterator(list);
  var fn = confirmFunction(func);
  var accumulator = (initial || listIter.step());

  while (!listIter.done()) {
    accumulator = fn(accumulator, listIter.step());
  }

  return accumulator;
};


var reduceRight = function(list, func, initial) {
  var listIter = reverseIterator(list);
  var fn = confirmFunction(func);
  var accumulator = (initial || listIter.step());

  while (!listIter.done()) {
    accumulator = fn(accumulator, listIter.step());
  }

  return accumulator;
};


var filter = function(list, func) {
  var fn = confirmFunction(func);
  var filtered = [];

  each(list, function(item) {
    if (fn(item)) {
      filtered.push(item);
    }
  });

  return filtered;
};


var reject = function(list, func) {
  var fn = confirmFunction(func);
  var rejected = [];

  each(list, function(item) {
    if (!fn(item)) {
      rejected.push(item);
    }
  });

  return rejected;
};


// - qualitators -

var all = function(list, func) {
  var fn = confirmFunction(func);
  var bool = true;

  each(list, function(item) {
    if (!fn(item)) {
      bool = false;
      return;
    }
  });

  return bool;
};


var any = function(list, func) {
  var fn = confirmFunction(func);
  var bool = false;

  each(list, function(item) {
    if (fn(item)) {
      bool = true;
      return;
    }
  });

  return bool;
};


var none = function(list, func) {
  var fn = confirmFunction(fn);
  var bool = true;

  each(list, function(item) {
    if (func(item)) {
      bool = false;
      return;
    }
  });

  return bool;
};


var count = function(list, func) {
  var tally = 0;

  each(list, function(item) {
    if (func(item)) {
      tally += 1;
    }
  });

  return tally;
}


// - higher functions -

var partial = function() {
  var func = arguments[arguments.length - 1];
  var boundArgs = Array.from(arguments).slice(0, arguments.length - 1);

  return function() {
    return func.apply(undefined, boundArgs.concat(Array.from(arguments)));
  }
}


var curry = function(times, func) {
  var stock = [];
  var curried = function(item) {
    stock.push(item);

    if (stock.length === times) {
      return func(stock);
    }

    return curried;
  }

  return curried;
}


var dirtyCurry = function(times, func) {
  var stock = [];

  var curried = function() {
    for (var j = 0; j < arguments.length; j++) {
      stock.push(arguments[j]);

      if (stock.length === times) {
        return func(stock);
      }
    }

    return curried;
  }

  return curried;
}


// - list factories -

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


var range = function() {
  var run = [];
  var start = 0;
  var end = arguments[0];
  var skip = 1;

  switch (arguments.length) {
    case 0:
      return [];
      break;
    case 2:
      start = arguments[0];
      end = arguments[1];
      break;
    case 3:
      skip = arguments[2];

      if (skip === 0) {
        return run;
      }

      break;
  }

  if (start < end) {
    if (skip < 1) {
      return run;
    }
    while (start < end) {
      run.push(start);
      start += skip;
    }
  }

  if (end < start) {
    if (skip > 0) {
      return run;
    }
    while (start > end) {
      run.push(start);
      start += skip;
    }
  }

  return run;
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


export {
  iterator,
  reverseIterator,
  times,
  each,
  reverseEach
}
