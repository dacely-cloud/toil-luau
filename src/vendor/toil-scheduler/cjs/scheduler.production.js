/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

let localPerformance, localDate, initialTime, taskQueue, timerQueue, taskIdCounter, currentTask, currentPriorityLevel, isPerformingWork, isHostCallbackScheduled, isHostTimeoutScheduled, needsPaint, localSetTimeout, localClearTimeout, localSetImmediate, isMessageLoopRunning, taskTimeoutID, frameInterval, startTime, schedulePerformWorkUntilDeadline, channel, port;
let __exports = {};
function push(heap, node) {
  let index, parentIndex, parent;
  index = __len(heap);
  __push(heap, node);
  {
    let __lb_3 = false,
      __lc_3 = false;
    while (!__lb_3) {
      __lc_3 = false;
      while (0 < index) {
        {
          parentIndex = index - 1 >>> 1;
          parent = heap[parentIndex];
          if (0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;else {
            __lb_3 = true;
            break;
          }
        }
        ;
      }
      if (__lc_3) {
        __lc_3 = false;
        ;
        continue;
      }
      break;
    }
  }
}
function peek(heap) {
  return 0 === __len(heap) ? undefined : heap[0];
}
function pop(heap) {
  let first, last, index, length, halfLength, leftIndex, left, rightIndex, right;
  if (0 === __len(heap)) return undefined;
  first = heap[0];
  last = __pop(heap);
  if (last !== first) {
    heap[0] = last;
    {
      index = 0;
      length = __len(heap);
      halfLength = length >>> 1;
      let __lb_2 = false,
        __lc_2 = false;
      while (!__lb_2) {
        __lc_2 = false;
        while (index < halfLength) {
          {
            leftIndex = 2 * __cat(index, 1) - 1;
            left = heap[leftIndex];
            rightIndex = __cat(leftIndex, 1);
            right = heap[rightIndex];
            if (0 > compare(left, last)) rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);else if (rightIndex < length && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;else {
              __lb_2 = true;
              break;
            }
          }
          ;
        }
        if (__lc_2) {
          __lc_2 = false;
          ;
          continue;
        }
        break;
      }
    }
  }
  return first;
}
function compare(a, b) {
  let diff;
  diff = a.sortIndex - b.sortIndex;
  return 0 !== diff ? diff : a.id - b.id;
}
__exports.unstable_now = void 0;
if ("object" === typeOfJS(performance) && "function" === typeOfJS(performance.now)) {
  localPerformance = performance;
  __exports.unstable_now = function () {
    return localPerformance.now();
  };
} else {
  localDate = Date;
  initialTime = localDate.now();
  __exports.unstable_now = function () {
    return localDate.now() - initialTime;
  };
}
taskQueue = __arrNew();
timerQueue = __arrNew();
taskIdCounter = 1;
currentTask = undefined;
currentPriorityLevel = 3;
isPerformingWork = !1;
isHostCallbackScheduled = !1;
isHostTimeoutScheduled = !1;
needsPaint = !1;
localSetTimeout = "function" === typeOfJS(setTimeout) ? setTimeout : undefined;
localClearTimeout = "function" === typeOfJS(clearTimeout) ? clearTimeout : undefined;
localSetImmediate = "undefined" !== typeOfJS(setImmediate) ? setImmediate : undefined;
function advanceTimers(currentTime) {
  let timer;
  for (timer = peek(timerQueue); undefined !== timer;) {
    if (undefined === timer.callback) pop(timerQueue);else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);else break;
    timer = peek(timerQueue);
  }
}
function handleTimeout(currentTime) {
  let firstTimer;
  isHostTimeoutScheduled = !1;
  advanceTimers(currentTime);
  if (!isHostCallbackScheduled) if (undefined !== peek(taskQueue)) isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline());else {
    firstTimer = peek(timerQueue);
    undefined !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
  }
}
isMessageLoopRunning = !1;
taskTimeoutID = -1;
frameInterval = 5;
startTime = -1;
function shouldYieldToHost() {
  return needsPaint ? !0 : __exports.unstable_now() - startTime < frameInterval ? !1 : !0;
}
function performWorkUntilDeadline() {
  let currentTime, hasMoreWork, previousPriorityLevel, callback, continuationCallback, firstTimer;
  needsPaint = !1;
  if (isMessageLoopRunning) {
    currentTime = __exports.unstable_now();
    startTime = currentTime;
    hasMoreWork = !0;
    try {
      {
        let __lb_1 = false,
          __lc_1 = false;
        while (!__lb_1) {
          {
            isHostCallbackScheduled = !1;
            isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
            isPerformingWork = !0;
            previousPriorityLevel = currentPriorityLevel;
            try {
              {
                let __lb_0 = false,
                  __lc_0 = false;
                while (!__lb_0) {
                  {
                    advanceTimers(currentTime);
                    for (currentTask = peek(taskQueue); undefined !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost());) {
                      callback = currentTask.callback;
                      if ("function" === typeOfJS(callback)) {
                        currentTask.callback = undefined;
                        currentPriorityLevel = currentTask.priorityLevel;
                        continuationCallback = callback(currentTask.expirationTime <= currentTime);
                        currentTime = __exports.unstable_now();
                        if ("function" === typeOfJS(continuationCallback)) {
                          currentTask.callback = continuationCallback;
                          advanceTimers(currentTime);
                          hasMoreWork = !0;
                          {
                            __lb_0 = true;
                            break;
                          }
                        }
                        currentTask === peek(taskQueue) && pop(taskQueue);
                        advanceTimers(currentTime);
                      } else pop(taskQueue);
                      currentTask = peek(taskQueue);
                    }
                    if (__lb_0 || __lc_0) {
                      break;
                    }
                    if (undefined !== currentTask) hasMoreWork = !0;else {
                      firstTimer = peek(timerQueue);
                      undefined !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                      hasMoreWork = !1;
                    }
                  }
                  break;
                }
              }
              {
                __lb_1 = true;
                break;
              }
            } finally {
              currentTask = undefined, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
            }
            hasMoreWork = void 0;
          }
          break;
        }
      }
    } finally {
      hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = !1;
    }
  }
}
if ("function" === typeOfJS(localSetImmediate)) schedulePerformWorkUntilDeadline = function () {
  localSetImmediate(performWorkUntilDeadline);
};else if ("undefined" !== typeOfJS(MessageChannel)) {
  channel = __new(MessageChannel);
  port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;
  schedulePerformWorkUntilDeadline = function () {
    port.postMessage(undefined);
  };
} else schedulePerformWorkUntilDeadline = function () {
  localSetTimeout(performWorkUntilDeadline, 0);
};
function requestHostTimeout(callback, ms) {
  taskTimeoutID = localSetTimeout(function () {
    callback(__exports.unstable_now());
  }, ms);
}
__exports.unstable_IdlePriority = 5;
__exports.unstable_ImmediatePriority = 1;
__exports.unstable_LowPriority = 4;
__exports.unstable_NormalPriority = 3;
__exports.unstable_Profiling = undefined;
__exports.unstable_UserBlockingPriority = 2;
__exports.unstable_cancelCallback = function (task) {
  task.callback = undefined;
};
__exports.unstable_forceFrameRate = function (fps) {
  0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
};
__exports.unstable_getCurrentPriorityLevel = function () {
  return currentPriorityLevel;
};
__exports.unstable_next = function (eventHandler) {
  let priorityLevel, previousPriorityLevel;
  switch (currentPriorityLevel) {
    case 1:
    case 2:
    case 3:
      priorityLevel = 3;
      break;
    default:
      priorityLevel = currentPriorityLevel;
  }
  previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
__exports.unstable_requestPaint = function () {
  needsPaint = !0;
};
__exports.unstable_runWithPriority = function (priorityLevel, eventHandler) {
  let previousPriorityLevel;
  switch (priorityLevel) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      priorityLevel = 3;
  }
  previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
__exports.unstable_scheduleCallback = function (priorityLevel, callback, options) {
  let currentTime, timeout;
  currentTime = __exports.unstable_now();
  "object" === typeOfJS(options) && undefined !== options ? (options = options.delay, options = "number" === typeOfJS(options) && 0 < options ? __cat(currentTime, options) : currentTime) : options = currentTime;
  switch (priorityLevel) {
    case 1:
      timeout = -1;
      break;
    case 2:
      timeout = 250;
      break;
    case 5:
      timeout = 1073741823;
      break;
    case 4:
      timeout = 1e4;
      break;
    default:
      timeout = 5e3;
  }
  timeout = __cat(options, timeout);
  priorityLevel = {
    id: taskIdCounter++,
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: options,
    expirationTime: timeout,
    sortIndex: -1
  };
  options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), undefined === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline())));
  return priorityLevel;
};
__exports.unstable_shouldYield = shouldYieldToHost;
__exports.unstable_wrapCallback = function (callback) {
  let parentPriorityLevel;
  parentPriorityLevel = currentPriorityLevel;
  return function (...__args) {
    let __allArgs = __arrNew(...__args);
    let previousPriorityLevel;
    previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = parentPriorityLevel;
    try {
      return __applyFn(callback, this, __allArgs);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
};
const __default = __exports,
  __n_unstable_IdlePriority = __exports.unstable_IdlePriority,
  __n_unstable_ImmediatePriority = __exports.unstable_ImmediatePriority,
  __n_unstable_LowPriority = __exports.unstable_LowPriority,
  __n_unstable_NormalPriority = __exports.unstable_NormalPriority,
  __n_unstable_Profiling = __exports.unstable_Profiling,
  __n_unstable_UserBlockingPriority = __exports.unstable_UserBlockingPriority,
  __n_unstable_cancelCallback = __exports.unstable_cancelCallback,
  __n_unstable_forceFrameRate = __exports.unstable_forceFrameRate,
  __n_unstable_getCurrentPriorityLevel = __exports.unstable_getCurrentPriorityLevel,
  __n_unstable_next = __exports.unstable_next,
  __n_unstable_now = __exports.unstable_now,
  __n_unstable_requestPaint = __exports.unstable_requestPaint,
  __n_unstable_runWithPriority = __exports.unstable_runWithPriority,
  __n_unstable_scheduleCallback = __exports.unstable_scheduleCallback,
  __n_unstable_shouldYield = __exports.unstable_shouldYield,
  __n_unstable_wrapCallback = __exports.unstable_wrapCallback;
export { __n_unstable_IdlePriority as unstable_IdlePriority, __n_unstable_ImmediatePriority as unstable_ImmediatePriority, __n_unstable_LowPriority as unstable_LowPriority, __n_unstable_NormalPriority as unstable_NormalPriority, __n_unstable_Profiling as unstable_Profiling, __n_unstable_UserBlockingPriority as unstable_UserBlockingPriority, __n_unstable_cancelCallback as unstable_cancelCallback, __n_unstable_forceFrameRate as unstable_forceFrameRate, __n_unstable_getCurrentPriorityLevel as unstable_getCurrentPriorityLevel, __n_unstable_next as unstable_next, __n_unstable_now as unstable_now, __n_unstable_requestPaint as unstable_requestPaint, __n_unstable_runWithPriority as unstable_runWithPriority, __n_unstable_scheduleCallback as unstable_scheduleCallback, __n_unstable_shouldYield as unstable_shouldYield, __n_unstable_wrapCallback as unstable_wrapCallback };
export default __default;
