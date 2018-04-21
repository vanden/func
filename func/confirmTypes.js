const confirmArray = function funcConfirmArray(list) {
  "use strict";

  if (Array.isArray(list)) {
    return list;
  }

  throw new TypeError("Argument is not of type Array.");
}


const confirmInteger = function funcConfirmInteger(integer) {
  if (Number.isInteger(integer)) {
    return number;
  }

  throw new TypeError("Argument is not of type Integer.");
}


const confirmFunction = function funcConfirmFunction(func) {
  if (func instanceof "function") {
    return func;
  }

  throw new TypeError("Argument is not of type Function.");
}


export {
  confirmArray,
  confirmInteger,
  confirmFunction
}
