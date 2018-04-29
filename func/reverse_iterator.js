import { confirmArray } from "./confirmTypes.js";


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


export {
  iterator
}
