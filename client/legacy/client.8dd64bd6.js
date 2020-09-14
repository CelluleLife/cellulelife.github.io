function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function noop() {}

function assign(tar, src) {
  // @ts-ignore
  for (var k in src) {
    tar[k] = src[k];
  }

  return tar;
}

function add_location(element, file, line, column, char) {
  element.__svelte_meta = {
    loc: {
      file: file,
      line: line,
      column: column,
      char: char
    }
  };
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
}

function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== 'function') {
    throw new Error("'".concat(name, "' is not a store with a 'subscribe' method"));
  }
}

function subscribe(store) {
  if (store == null) {
    return noop;
  }

  for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    callbacks[_key - 1] = arguments[_key];
  }

  var unsub = store.subscribe.apply(store, callbacks);
  return unsub.unsubscribe ? function () {
    return unsub.unsubscribe();
  } : unsub;
}

function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    var lets = definition[2](fn(dirty));

    if ($$scope.dirty === undefined) {
      return lets;
    }

    if (_typeof(lets) === 'object') {
      var merged = [];
      var len = Math.max($$scope.dirty.length, lets.length);

      for (var i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }

      return merged;
    }

    return $$scope.dirty | lets;
  }

  return $$scope.dirty;
}

function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  var slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);

  if (slot_changes) {
    var slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}

function exclude_internal_props(props) {
  var result = {};

  for (var k in props) {
    if (k[0] !== '$') result[k] = props[k];
  }

  return result;
}

function null_to_empty(value) {
  return value == null ? '' : value;
}

function append(target, node) {
  target.appendChild(node);
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function destroy_each(iterations, detaching) {
  for (var i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

function element(name) {
  return document.createElement(name);
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return function () {
    return node.removeEventListener(event, handler, options);
  };
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function set_attributes(node, attributes) {
  // @ts-ignore
  var descriptors = Object.getOwnPropertyDescriptors(node.__proto__);

  for (var key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === 'style') {
      node.style.cssText = attributes[key];
    } else if (key === '__value') {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}

function set_svg_attributes(node, attributes) {
  for (var key in attributes) {
    attr(node, key, attributes[key]);
  }
}

function children(element) {
  return Array.from(element.childNodes);
}

function claim_element(nodes, name, attributes, svg) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeName === name) {
      var j = 0;

      while (j < node.attributes.length) {
        var attribute = node.attributes[j];

        if (attributes[attribute.name]) {
          j++;
        } else {
          node.removeAttribute(attribute.name);
        }
      }

      return nodes.splice(i, 1)[0];
    }
  }

  return svg ? svg_element(name) : element(name);
}

function claim_text(nodes, data) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeType === 3) {
      node.data = '' + data;
      return nodes.splice(i, 1)[0];
    }
  }

  return text(data);
}

function claim_space(nodes) {
  return claim_text(nodes, ' ');
}

function select_option(select, value) {
  for (var i = 0; i < select.options.length; i += 1) {
    var option = select.options[i];

    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
}

function select_value(select) {
  var selected_option = select.querySelector(':checked') || select.options[0];
  return selected_option && selected_option.__value;
}

function toggle_class(element, name, toggle) {
  element.classList[toggle ? 'add' : 'remove'](name);
}

function custom_event(type, detail) {
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, false, false, detail);
  return e;
}

function query_selector_all(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  return Array.from(parent.querySelectorAll(selector));
}

var current_component;

function set_current_component(component) {
  current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}

function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}

function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

function createEventDispatcher() {
  var component = get_current_component();
  return function (type, detail) {
    var callbacks = component.$$.callbacks[type];

    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      var event = custom_event(type, detail);
      callbacks.slice().forEach(function (fn) {
        fn.call(component, event);
      });
    }
  };
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
// shorthand events, or if we want to implement
// a real bubbling mechanism


function bubble(component, event) {
  var callbacks = component.$$.callbacks[event.type];

  if (callbacks) {
    callbacks.slice().forEach(function (fn) {
      return fn(event);
    });
  }
}

var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}

var flushing = false;
var seen_callbacks = new Set();

function flush() {
  if (flushing) return;
  flushing = true;

  do {
    // first, call beforeUpdate functions
    // and update components
    for (var i = 0; i < dirty_components.length; i += 1) {
      var component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }

    dirty_components.length = 0;

    while (binding_callbacks.length) {
      binding_callbacks.pop()();
    } // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (var _i = 0; _i < render_callbacks.length; _i += 1) {
      var callback = render_callbacks[_i];

      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}

function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    var dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

var outroing = new Set();
var outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(function () {
      outroing.delete(block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

var globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

function get_spread_update(levels, updates) {
  var update = {};
  var to_null_out = {};
  var accounted_for = {
    $$scope: 1
  };
  var i = levels.length;

  while (i--) {
    var o = levels[i];
    var n = updates[i];

    if (n) {
      for (var key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (var _key3 in n) {
        if (!accounted_for[_key3]) {
          update[_key3] = n[_key3];
          accounted_for[_key3] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (var _key4 in o) {
        accounted_for[_key4] = 1;
      }
    }
  }

  for (var _key5 in to_null_out) {
    if (!(_key5 in update)) update[_key5] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return _typeof(spread_props) === 'object' && spread_props !== null ? spread_props : {};
} // source: https://html.spec.whatwg.org/multipage/indices.html

function bind(component, name, callback) {
  var index = component.$$.props[name];

  if (index !== undefined) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}

function create_component(block) {
  block && block.c();
}

function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}

function mount_component(component, target, anchor) {
  var _component$$$ = component.$$,
      fragment = _component$$$.fragment,
      on_mount = _component$$$.on_mount,
      on_destroy = _component$$$.on_destroy,
      after_update = _component$$$.after_update;
  fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

  add_render_callback(function () {
    var new_on_destroy = on_mount.map(run).filter(is_function);

    if (on_destroy) {
      on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
    } else {
      // Edge case - component was destroyed immediately,
      // most likely as a result of a binding initialising
      run_all(new_on_destroy);
    }

    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  var $$ = component.$$;

  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }

  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

function init(component, options, instance, create_fragment, not_equal, props) {
  var dirty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
  var parent_component = current_component;
  set_current_component(component);
  var prop_values = options.props || {};
  var $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props: props,
    update: noop,
    not_equal: not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : []),
    // everything else
    callbacks: blank_object(),
    dirty: dirty
  };
  var ready = false;
  $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if ($$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }

    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update); // `false` as a special case of no DOM component

  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

  if (options.target) {
    if (options.hydrate) {
      var nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }

  set_current_component(parent_component);
}

var SvelteComponent = /*#__PURE__*/function () {
  function SvelteComponent() {
    _classCallCheck(this, SvelteComponent);
  }

  _createClass(SvelteComponent, [{
    key: "$destroy",
    value: function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
  }, {
    key: "$on",
    value: function $on(type, callback) {
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
  }, {
    key: "$set",
    value: function $set() {// overridden by instance, if it has props
    }
  }]);

  return SvelteComponent;
}();

function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({
    version: '3.23.0'
  }, detail)));
}

function append_dev(target, node) {
  dispatch_dev("SvelteDOMInsert", {
    target: target,
    node: node
  });
  append(target, node);
}

function insert_dev(target, node, anchor) {
  dispatch_dev("SvelteDOMInsert", {
    target: target,
    node: node,
    anchor: anchor
  });
  insert(target, node, anchor);
}

function detach_dev(node) {
  dispatch_dev("SvelteDOMRemove", {
    node: node
  });
  detach(node);
}

function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
  var modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
  if (has_prevent_default) modifiers.push('preventDefault');
  if (has_stop_propagation) modifiers.push('stopPropagation');
  dispatch_dev("SvelteDOMAddEventListener", {
    node: node,
    event: event,
    handler: handler,
    modifiers: modifiers
  });
  var dispose = listen(node, event, handler, options);
  return function () {
    dispatch_dev("SvelteDOMRemoveEventListener", {
      node: node,
      event: event,
      handler: handler,
      modifiers: modifiers
    });
    dispose();
  };
}

function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
    node: node,
    attribute: attribute
  });else dispatch_dev("SvelteDOMSetAttribute", {
    node: node,
    attribute: attribute,
    value: value
  });
}

function prop_dev(node, property, value) {
  node[property] = value;
  dispatch_dev("SvelteDOMSetProperty", {
    node: node,
    property: property,
    value: value
  });
}

function set_data_dev(text, data) {
  data = '' + data;
  if (text.data === data) return;
  dispatch_dev("SvelteDOMSetData", {
    node: text,
    data: data
  });
  text.data = data;
}

function validate_each_argument(arg) {
  if (typeof arg !== 'string' && !(arg && _typeof(arg) === 'object' && 'length' in arg)) {
    var msg = '{#each} only iterates over array-like objects.';

    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
      msg += ' You can use a spread to convert this iterable into an array.';
    }

    throw new Error(msg);
  }
}

function validate_slots(name, slot, keys) {
  for (var _i2 = 0, _Object$keys = Object.keys(slot); _i2 < _Object$keys.length; _i2++) {
    var slot_key = _Object$keys[_i2];

    if (!~keys.indexOf(slot_key)) {
      console.warn("<".concat(name, "> received an unexpected slot \"").concat(slot_key, "\"."));
    }
  }
}

var SvelteComponentDev = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(SvelteComponentDev, _SvelteComponent);

  var _super2 = _createSuper(SvelteComponentDev);

  function SvelteComponentDev(options) {
    _classCallCheck(this, SvelteComponentDev);

    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }

    return _super2.call(this);
  }

  _createClass(SvelteComponentDev, [{
    key: "$destroy",
    value: function $destroy() {
      _get(_getPrototypeOf(SvelteComponentDev.prototype), "$destroy", this).call(this);

      this.$destroy = function () {
        console.warn("Component was already destroyed"); // eslint-disable-line no-console
      };
    }
  }, {
    key: "$capture_state",
    value: function $capture_state() {}
  }, {
    key: "$inject_state",
    value: function $inject_state() {}
  }]);

  return SvelteComponentDev;
}(SvelteComponent);

var subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */


function writable(value) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var stop;
  var subscribers = [];

  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        var run_queue = !subscriber_queue.length;

        for (var i = 0; i < subscribers.length; i += 1) {
          var s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }

        if (run_queue) {
          for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
            subscriber_queue[_i][0](subscriber_queue[_i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run) {
    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var subscriber = [run, invalidate];
    subscribers.push(subscriber);

    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }

    run(value);
    return function () {
      var index = subscribers.indexOf(subscriber);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }

      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set: set,
    update: update,
    subscribe: subscribe
  };
}

var CONTEXT_KEY = {};
var preload = function preload() {
  return {};
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "node_modules/svelma/src/components/Icon.svelte";

function create_fragment(ctx) {
  var span;
  var i;
  var i_class_value;
  var span_class_value;
  var mounted;
  var dispose;
  var block = {
    c: function create() {
      span = element("span");
      i = element("i");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      i = claim_element(span_nodes, "I", {
        class: true
      });
      children(i).forEach(detach_dev);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(i, "class", i_class_value = "" + (
      /*newPack*/
      ctx[8] + " fa-" +
      /*icon*/
      ctx[0] + " " +
      /*customClass*/
      ctx[2] + " " +
      /*newCustomSize*/
      ctx[6]));
      add_location(i, file, 53, 2, 1189);
      attr_dev(span, "class", span_class_value = "icon " +
      /*size*/
      ctx[1] + " " +
      /*newType*/
      ctx[7] + " " + (
      /*isLeft*/
      ctx[4] && "is-left" || "") + " " + (
      /*isRight*/
      ctx[5] && "is-right" || ""));
      toggle_class(span, "is-clickable",
      /*isClickable*/
      ctx[3]);
      add_location(span, file, 52, 0, 1046);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, i);

      if (!mounted) {
        dispose = listen_dev(span, "click",
        /*click_handler*/
        ctx[12], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*newPack, icon, customClass, newCustomSize*/
      325 && i_class_value !== (i_class_value = "" + (
      /*newPack*/
      ctx[8] + " fa-" +
      /*icon*/
      ctx[0] + " " +
      /*customClass*/
      ctx[2] + " " +
      /*newCustomSize*/
      ctx[6]))) {
        attr_dev(i, "class", i_class_value);
      }

      if (dirty &
      /*size, newType, isLeft, isRight*/
      178 && span_class_value !== (span_class_value = "icon " +
      /*size*/
      ctx[1] + " " +
      /*newType*/
      ctx[7] + " " + (
      /*isLeft*/
      ctx[4] && "is-left" || "") + " " + (
      /*isRight*/
      ctx[5] && "is-right" || ""))) {
        attr_dev(span, "class", span_class_value);
      }

      if (dirty &
      /*size, newType, isLeft, isRight, isClickable*/
      186) {
        toggle_class(span, "is-clickable",
        /*isClickable*/
        ctx[3]);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var _$$props$type = $$props.type,
      type = _$$props$type === void 0 ? "" : _$$props$type;
  var _$$props$pack = $$props.pack,
      pack = _$$props$pack === void 0 ? "fas" : _$$props$pack;
  var icon = $$props.icon;
  var _$$props$size = $$props.size,
      size = _$$props$size === void 0 ? "" : _$$props$size;
  var _$$props$customClass = $$props.customClass,
      customClass = _$$props$customClass === void 0 ? "" : _$$props$customClass;
  var _$$props$customSize = $$props.customSize,
      customSize = _$$props$customSize === void 0 ? "" : _$$props$customSize;
  var _$$props$isClickable = $$props.isClickable,
      isClickable = _$$props$isClickable === void 0 ? false : _$$props$isClickable;
  var _$$props$isLeft = $$props.isLeft,
      isLeft = _$$props$isLeft === void 0 ? false : _$$props$isLeft;
  var _$$props$isRight = $$props.isRight,
      isRight = _$$props$isRight === void 0 ? false : _$$props$isRight;
  var newCustomSize = "";
  var newType = "";
  var writable_props = ["type", "pack", "icon", "size", "customClass", "customSize", "isClickable", "isLeft", "isRight"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Icon> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Icon", $$slots, []);

  function click_handler(event) {
    bubble($$self, event);
  }

  $$self.$set = function ($$props) {
    if ("type" in $$props) $$invalidate(9, type = $$props.type);
    if ("pack" in $$props) $$invalidate(10, pack = $$props.pack);
    if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    if ("size" in $$props) $$invalidate(1, size = $$props.size);
    if ("customClass" in $$props) $$invalidate(2, customClass = $$props.customClass);
    if ("customSize" in $$props) $$invalidate(11, customSize = $$props.customSize);
    if ("isClickable" in $$props) $$invalidate(3, isClickable = $$props.isClickable);
    if ("isLeft" in $$props) $$invalidate(4, isLeft = $$props.isLeft);
    if ("isRight" in $$props) $$invalidate(5, isRight = $$props.isRight);
  };

  $$self.$capture_state = function () {
    return {
      type: type,
      pack: pack,
      icon: icon,
      size: size,
      customClass: customClass,
      customSize: customSize,
      isClickable: isClickable,
      isLeft: isLeft,
      isRight: isRight,
      newCustomSize: newCustomSize,
      newType: newType,
      newPack: newPack
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("type" in $$props) $$invalidate(9, type = $$props.type);
    if ("pack" in $$props) $$invalidate(10, pack = $$props.pack);
    if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
    if ("size" in $$props) $$invalidate(1, size = $$props.size);
    if ("customClass" in $$props) $$invalidate(2, customClass = $$props.customClass);
    if ("customSize" in $$props) $$invalidate(11, customSize = $$props.customSize);
    if ("isClickable" in $$props) $$invalidate(3, isClickable = $$props.isClickable);
    if ("isLeft" in $$props) $$invalidate(4, isLeft = $$props.isLeft);
    if ("isRight" in $$props) $$invalidate(5, isRight = $$props.isRight);
    if ("newCustomSize" in $$props) $$invalidate(6, newCustomSize = $$props.newCustomSize);
    if ("newType" in $$props) $$invalidate(7, newType = $$props.newType);
    if ("newPack" in $$props) $$invalidate(8, newPack = $$props.newPack);
  };

  var newPack;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*pack*/
    1024) {
       $$invalidate(8, newPack = pack || "fas");
    }

    if ($$self.$$.dirty &
    /*customSize, size*/
    2050) {
       {
        if (customSize) $$invalidate(6, newCustomSize = customSize);else {
          switch (size) {
            case "is-small":
              break;

            case "is-medium":
              $$invalidate(6, newCustomSize = "fa-lg");
              break;

            case "is-large":
              $$invalidate(6, newCustomSize = "fa-3x");
              break;

            default:
              $$invalidate(6, newCustomSize = "");
          }
        }
      }
    }

    if ($$self.$$.dirty &
    /*type*/
    512) {
       {
        if (!type) $$invalidate(7, newType = "");
        var splitType = [];

        if (typeof type === "string") {
          splitType = type.split("-");
        } else {
          for (var key in type) {
            if (type[key]) {
              splitType = key.split("-");
              break;
            }
          }
        }

        if (splitType.length <= 1) $$invalidate(7, newType = "");else $$invalidate(7, newType = "has-text-".concat(splitType[1]));
      }
    }
  };

  return [icon, size, customClass, isClickable, isLeft, isRight, newCustomSize, newType, newPack, type, pack, customSize, click_handler];
}

var Icon = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Icon, _SvelteComponentDev);

  var _super = _createSuper$1(Icon);

  function Icon(options) {
    var _this;

    _classCallCheck(this, Icon);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      type: 9,
      pack: 10,
      icon: 0,
      size: 1,
      customClass: 2,
      customSize: 11,
      isClickable: 3,
      isLeft: 4,
      isRight: 5
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Icon",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*icon*/
    ctx[0] === undefined && !("icon" in props)) {
      console.warn("<Icon> was created without expected prop 'icon'");
    }

    return _this;
  }

  _createClass(Icon, [{
    key: "type",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "pack",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "icon",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "size",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "customClass",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "customSize",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isClickable",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isLeft",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isRight",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Icon;
}(SvelteComponentDev);

function omit(obj) {
  for (var _len = arguments.length, keysToOmit = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keysToOmit[_key - 1] = arguments[_key];
  }

  return Object.keys(obj).reduce(function (acc, key) {
    if (keysToOmit.indexOf(key) === -1) acc[key] = obj[key];
    return acc;
  }, {});
}

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Error_1 = globals.Error;
var file$1 = "node_modules/svelma/src/components/Button.svelte"; // (85:22) 

function create_if_block_3(ctx) {
  var a;
  var t0;
  var span;
  var t1;
  var current;
  var mounted;
  var dispose;
  var if_block0 =
  /*iconLeft*/
  ctx[7] && create_if_block_5(ctx);
  var default_slot_template =
  /*$$slots*/
  ctx[16].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[15], null);
  var if_block1 =
  /*iconRight*/
  ctx[8] && create_if_block_4(ctx);
  var a_levels = [{
    href:
    /*href*/
    ctx[1]
  },
  /*props*/
  ctx[11]];
  var a_data = {};

  for (var i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }

  var block = {
    c: function create() {
      a = element("a");
      if (if_block0) if_block0.c();
      t0 = space();
      span = element("span");
      if (default_slot) default_slot.c();
      t1 = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        href: true
      });
      var a_nodes = children(a);
      if (if_block0) if_block0.l(a_nodes);
      t0 = claim_space(a_nodes);
      span = claim_element(a_nodes, "SPAN", {});
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      t1 = claim_space(a_nodes);
      if (if_block1) if_block1.l(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$1, 96, 4, 2314);
      set_attributes(a, a_data);
      toggle_class(a, "is-inverted",
      /*inverted*/
      ctx[4]);
      toggle_class(a, "is-loading",
      /*loading*/
      ctx[3]);
      toggle_class(a, "is-outlined",
      /*outlined*/
      ctx[5]);
      toggle_class(a, "is-rounded",
      /*rounded*/
      ctx[6]);
      add_location(a, file$1, 85, 2, 2047);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      if (if_block0) if_block0.m(a, null);
      append_dev(a, t0);
      append_dev(a, span);

      if (default_slot) {
        default_slot.m(span, null);
      }

      append_dev(a, t1);
      if (if_block1) if_block1.m(a, null);
      current = true;

      if (!mounted) {
        dispose = listen_dev(a, "click",
        /*click_handler_1*/
        ctx[18], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (
      /*iconLeft*/
      ctx[7]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*iconLeft*/
          128) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_5(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(a, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        32768) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[15], dirty, null, null);
        }
      }

      if (
      /*iconRight*/
      ctx[8]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*iconRight*/
          256) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_4(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(a, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      set_attributes(a, a_data = get_spread_update(a_levels, [dirty &
      /*href*/
      2 && {
        href:
        /*href*/
        ctx[1]
      }, dirty &
      /*props*/
      2048 &&
      /*props*/
      ctx[11]]));
      toggle_class(a, "is-inverted",
      /*inverted*/
      ctx[4]);
      toggle_class(a, "is-loading",
      /*loading*/
      ctx[3]);
      toggle_class(a, "is-outlined",
      /*outlined*/
      ctx[5]);
      toggle_class(a, "is-rounded",
      /*rounded*/
      ctx[6]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(default_slot, local);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(default_slot, local);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
      if (if_block0) if_block0.d();
      if (default_slot) default_slot.d(detaching);
      if (if_block1) if_block1.d();
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(85:22) ",
    ctx: ctx
  });
  return block;
} // (66:0) {#if tag === 'button'}


function create_if_block(ctx) {
  var button;
  var t0;
  var span;
  var t1;
  var current;
  var mounted;
  var dispose;
  var if_block0 =
  /*iconLeft*/
  ctx[7] && create_if_block_2(ctx);
  var default_slot_template =
  /*$$slots*/
  ctx[16].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[15], null);
  var if_block1 =
  /*iconRight*/
  ctx[8] && create_if_block_1(ctx);
  var button_levels = [
  /*props*/
  ctx[11], {
    type:
    /*nativeType*/
    ctx[2]
  }];
  var button_data = {};

  for (var i = 0; i < button_levels.length; i += 1) {
    button_data = assign(button_data, button_levels[i]);
  }

  var block = {
    c: function create() {
      button = element("button");
      if (if_block0) if_block0.c();
      t0 = space();
      span = element("span");
      if (default_slot) default_slot.c();
      t1 = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      button = claim_element(nodes, "BUTTON", {
        type: true
      });
      var button_nodes = children(button);
      if (if_block0) if_block0.l(button_nodes);
      t0 = claim_space(button_nodes);
      span = claim_element(button_nodes, "SPAN", {});
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      t1 = claim_space(button_nodes);
      if (if_block1) if_block1.l(button_nodes);
      button_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(span, file$1, 77, 4, 1882);
      set_attributes(button, button_data);
      toggle_class(button, "is-inverted",
      /*inverted*/
      ctx[4]);
      toggle_class(button, "is-loading",
      /*loading*/
      ctx[3]);
      toggle_class(button, "is-outlined",
      /*outlined*/
      ctx[5]);
      toggle_class(button, "is-rounded",
      /*rounded*/
      ctx[6]);
      add_location(button, file$1, 66, 2, 1599);
    },
    m: function mount(target, anchor) {
      insert_dev(target, button, anchor);
      if (if_block0) if_block0.m(button, null);
      append_dev(button, t0);
      append_dev(button, span);

      if (default_slot) {
        default_slot.m(span, null);
      }

      append_dev(button, t1);
      if (if_block1) if_block1.m(button, null);
      current = true;

      if (!mounted) {
        dispose = listen_dev(button, "click",
        /*click_handler*/
        ctx[17], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (
      /*iconLeft*/
      ctx[7]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*iconLeft*/
          128) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(button, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        32768) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[15], dirty, null, null);
        }
      }

      if (
      /*iconRight*/
      ctx[8]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*iconRight*/
          256) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(button, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      set_attributes(button, button_data = get_spread_update(button_levels, [dirty &
      /*props*/
      2048 &&
      /*props*/
      ctx[11], dirty &
      /*nativeType*/
      4 && {
        type:
        /*nativeType*/
        ctx[2]
      }]));
      toggle_class(button, "is-inverted",
      /*inverted*/
      ctx[4]);
      toggle_class(button, "is-loading",
      /*loading*/
      ctx[3]);
      toggle_class(button, "is-outlined",
      /*outlined*/
      ctx[5]);
      toggle_class(button, "is-rounded",
      /*rounded*/
      ctx[6]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(default_slot, local);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(default_slot, local);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(button);
      if (if_block0) if_block0.d();
      if (default_slot) default_slot.d(detaching);
      if (if_block1) if_block1.d();
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(66:0) {#if tag === 'button'}",
    ctx: ctx
  });
  return block;
} // (94:4) {#if iconLeft}


function create_if_block_5(ctx) {
  var current;
  var icon = new Icon({
    props: {
      pack:
      /*iconPack*/
      ctx[9],
      icon:
      /*iconLeft*/
      ctx[7],
      size:
      /*iconSize*/
      ctx[10]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(icon.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var icon_changes = {};
      if (dirty &
      /*iconPack*/
      512) icon_changes.pack =
      /*iconPack*/
      ctx[9];
      if (dirty &
      /*iconLeft*/
      128) icon_changes.icon =
      /*iconLeft*/
      ctx[7];
      if (dirty &
      /*iconSize*/
      1024) icon_changes.size =
      /*iconSize*/
      ctx[10];
      icon.$set(icon_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(icon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(94:4) {#if iconLeft}",
    ctx: ctx
  });
  return block;
} // (100:4) {#if iconRight}


function create_if_block_4(ctx) {
  var current;
  var icon = new Icon({
    props: {
      pack:
      /*iconPack*/
      ctx[9],
      icon:
      /*iconRight*/
      ctx[8],
      size:
      /*iconSize*/
      ctx[10]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(icon.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var icon_changes = {};
      if (dirty &
      /*iconPack*/
      512) icon_changes.pack =
      /*iconPack*/
      ctx[9];
      if (dirty &
      /*iconRight*/
      256) icon_changes.icon =
      /*iconRight*/
      ctx[8];
      if (dirty &
      /*iconSize*/
      1024) icon_changes.size =
      /*iconSize*/
      ctx[10];
      icon.$set(icon_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(icon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(100:4) {#if iconRight}",
    ctx: ctx
  });
  return block;
} // (75:4) {#if iconLeft}


function create_if_block_2(ctx) {
  var current;
  var icon = new Icon({
    props: {
      pack:
      /*iconPack*/
      ctx[9],
      icon:
      /*iconLeft*/
      ctx[7],
      size:
      /*iconSize*/
      ctx[10]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(icon.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var icon_changes = {};
      if (dirty &
      /*iconPack*/
      512) icon_changes.pack =
      /*iconPack*/
      ctx[9];
      if (dirty &
      /*iconLeft*/
      128) icon_changes.icon =
      /*iconLeft*/
      ctx[7];
      if (dirty &
      /*iconSize*/
      1024) icon_changes.size =
      /*iconSize*/
      ctx[10];
      icon.$set(icon_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(icon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(75:4) {#if iconLeft}",
    ctx: ctx
  });
  return block;
} // (81:4) {#if iconRight}


function create_if_block_1(ctx) {
  var current;
  var icon = new Icon({
    props: {
      pack:
      /*iconPack*/
      ctx[9],
      icon:
      /*iconRight*/
      ctx[8],
      size:
      /*iconSize*/
      ctx[10]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(icon.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var icon_changes = {};
      if (dirty &
      /*iconPack*/
      512) icon_changes.pack =
      /*iconPack*/
      ctx[9];
      if (dirty &
      /*iconRight*/
      256) icon_changes.icon =
      /*iconRight*/
      ctx[8];
      if (dirty &
      /*iconSize*/
      1024) icon_changes.size =
      /*iconSize*/
      ctx[10];
      icon.$set(icon_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(icon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(81:4) {#if iconRight}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block, create_if_block_3];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*tag*/
    ctx[0] === "button") return 0;
    if (
    /*tag*/
    ctx[0] === "a") return 1;
    return -1;
  }

  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }

  var block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }

      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, function () {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }

        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];

          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
            if_block.c();
          }

          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }

      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$1($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$tag = _$$props.tag,
      tag = _$$props$tag === void 0 ? "button" : _$$props$tag;
  var _$$props2 = $$props,
      _$$props2$type = _$$props2.type,
      type = _$$props2$type === void 0 ? "" : _$$props2$type;
  var _$$props3 = $$props,
      _$$props3$size = _$$props3.size,
      size = _$$props3$size === void 0 ? "" : _$$props3$size;
  var _$$props4 = $$props,
      _$$props4$href = _$$props4.href,
      href = _$$props4$href === void 0 ? "" : _$$props4$href;
  var _$$props5 = $$props,
      _$$props5$nativeType = _$$props5.nativeType,
      nativeType = _$$props5$nativeType === void 0 ? "button" : _$$props5$nativeType;
  var _$$props6 = $$props,
      _$$props6$loading = _$$props6.loading,
      loading = _$$props6$loading === void 0 ? false : _$$props6$loading;
  var _$$props7 = $$props,
      _$$props7$inverted = _$$props7.inverted,
      inverted = _$$props7$inverted === void 0 ? false : _$$props7$inverted;
  var _$$props8 = $$props,
      _$$props8$outlined = _$$props8.outlined,
      outlined = _$$props8$outlined === void 0 ? false : _$$props8$outlined;
  var _$$props9 = $$props,
      _$$props9$rounded = _$$props9.rounded,
      rounded = _$$props9$rounded === void 0 ? false : _$$props9$rounded;
  var _$$props10 = $$props,
      _$$props10$iconLeft = _$$props10.iconLeft,
      iconLeft = _$$props10$iconLeft === void 0 ? null : _$$props10$iconLeft;
  var _$$props11 = $$props,
      _$$props11$iconRight = _$$props11.iconRight,
      iconRight = _$$props11$iconRight === void 0 ? null : _$$props11$iconRight;
  var _$$props12 = $$props,
      _$$props12$iconPack = _$$props12.iconPack,
      iconPack = _$$props12$iconPack === void 0 ? null : _$$props12$iconPack;
  var iconSize = "";
  onMount(function () {
    if (!["button", "a"].includes(tag)) throw new Error("'".concat(tag, "' cannot be used as a tag for a Bulma button"));
  });
  var _$$props13 = $$props,
      _$$props13$$$slots = _$$props13.$$slots,
      $$slots = _$$props13$$$slots === void 0 ? {} : _$$props13$$$slots,
      $$scope = _$$props13.$$scope;
  validate_slots("Button", $$slots, ['default']);

  function click_handler(event) {
    bubble($$self, event);
  }

  function click_handler_1(event) {
    bubble($$self, event);
  }

  $$self.$set = function ($$new_props) {
    $$invalidate(14, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("tag" in $$new_props) $$invalidate(0, tag = $$new_props.tag);
    if ("type" in $$new_props) $$invalidate(12, type = $$new_props.type);
    if ("size" in $$new_props) $$invalidate(13, size = $$new_props.size);
    if ("href" in $$new_props) $$invalidate(1, href = $$new_props.href);
    if ("nativeType" in $$new_props) $$invalidate(2, nativeType = $$new_props.nativeType);
    if ("loading" in $$new_props) $$invalidate(3, loading = $$new_props.loading);
    if ("inverted" in $$new_props) $$invalidate(4, inverted = $$new_props.inverted);
    if ("outlined" in $$new_props) $$invalidate(5, outlined = $$new_props.outlined);
    if ("rounded" in $$new_props) $$invalidate(6, rounded = $$new_props.rounded);
    if ("iconLeft" in $$new_props) $$invalidate(7, iconLeft = $$new_props.iconLeft);
    if ("iconRight" in $$new_props) $$invalidate(8, iconRight = $$new_props.iconRight);
    if ("iconPack" in $$new_props) $$invalidate(9, iconPack = $$new_props.iconPack);
    if ("$$scope" in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      onMount: onMount,
      Icon: Icon,
      omit: omit,
      tag: tag,
      type: type,
      size: size,
      href: href,
      nativeType: nativeType,
      loading: loading,
      inverted: inverted,
      outlined: outlined,
      rounded: rounded,
      iconLeft: iconLeft,
      iconRight: iconRight,
      iconPack: iconPack,
      iconSize: iconSize,
      props: props
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(14, $$props = assign(assign({}, $$props), $$new_props));
    if ("tag" in $$props) $$invalidate(0, tag = $$new_props.tag);
    if ("type" in $$props) $$invalidate(12, type = $$new_props.type);
    if ("size" in $$props) $$invalidate(13, size = $$new_props.size);
    if ("href" in $$props) $$invalidate(1, href = $$new_props.href);
    if ("nativeType" in $$props) $$invalidate(2, nativeType = $$new_props.nativeType);
    if ("loading" in $$props) $$invalidate(3, loading = $$new_props.loading);
    if ("inverted" in $$props) $$invalidate(4, inverted = $$new_props.inverted);
    if ("outlined" in $$props) $$invalidate(5, outlined = $$new_props.outlined);
    if ("rounded" in $$props) $$invalidate(6, rounded = $$new_props.rounded);
    if ("iconLeft" in $$props) $$invalidate(7, iconLeft = $$new_props.iconLeft);
    if ("iconRight" in $$props) $$invalidate(8, iconRight = $$new_props.iconRight);
    if ("iconPack" in $$props) $$invalidate(9, iconPack = $$new_props.iconPack);
    if ("iconSize" in $$props) $$invalidate(10, iconSize = $$new_props.iconSize);
    if ("props" in $$props) $$invalidate(11, props = $$new_props.props);
  };

  var props;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
     $$invalidate(11, props = _objectSpread(_objectSpread({}, omit($$props, "loading", "inverted", "nativeType", "outlined", "rounded", "type")), {}, {
      class: "button ".concat(type, " ").concat(size, " ").concat($$props.class || "")
    }));

    if ($$self.$$.dirty &
    /*size*/
    8192) {
       {
        if (!size || size === "is-medium") {
          $$invalidate(10, iconSize = "is-small");
        } else if (size === "is-large") {
          $$invalidate(10, iconSize = "is-medium");
        } else {
          $$invalidate(10, iconSize = size);
        }
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [tag, href, nativeType, loading, inverted, outlined, rounded, iconLeft, iconRight, iconPack, iconSize, props, type, size, $$props, $$scope, $$slots, click_handler, click_handler_1];
}

var Button = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Button, _SvelteComponentDev);

  var _super = _createSuper$2(Button);

  function Button(options) {
    var _this;

    _classCallCheck(this, Button);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      tag: 0,
      type: 12,
      size: 13,
      href: 1,
      nativeType: 2,
      loading: 3,
      inverted: 4,
      outlined: 5,
      rounded: 6,
      iconLeft: 7,
      iconRight: 8,
      iconPack: 9
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Button",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  _createClass(Button, [{
    key: "tag",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "type",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "size",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "href",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nativeType",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "loading",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "inverted",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "outlined",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "rounded",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "iconLeft",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "iconRight",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "iconPack",
    get: function get() {
      throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Button;
}(SvelteComponentDev);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "node_modules/svelma/src/components/Switch.svelte";

function create_fragment$2(ctx) {
  var label_1;
  var input_1;
  var t0;
  var div;
  var div_class_value;
  var t1;
  var span;
  var label_1_class_value;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[8].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[7], null);
  var block = {
    c: function create() {
      label_1 = element("label");
      input_1 = element("input");
      t0 = space();
      div = element("div");
      t1 = space();
      span = element("span");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      label_1 = claim_element(nodes, "LABEL", {
        ref: true,
        class: true
      });
      var label_1_nodes = children(label_1);
      input_1 = claim_element(label_1_nodes, "INPUT", {
        type: true,
        class: true
      });
      t0 = claim_space(label_1_nodes);
      div = claim_element(label_1_nodes, "DIV", {
        class: true
      });
      children(div).forEach(detach_dev);
      t1 = claim_space(label_1_nodes);
      span = claim_element(label_1_nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      label_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(input_1, "type", "checkbox");
      attr_dev(input_1, "class", "svelte-ejw4cs");
      add_location(input_1, file$2, 123, 2, 3602);
      attr_dev(div, "class", div_class_value = "check " +
      /*newBackground*/
      ctx[4] + " svelte-ejw4cs");
      add_location(div, file$2, 125, 2, 3680);
      attr_dev(span, "class", "control-label svelte-ejw4cs");
      add_location(span, file$2, 127, 2, 3725);
      attr_dev(label_1, "ref", "label");
      attr_dev(label_1, "class", label_1_class_value = "switch " +
      /*size*/
      ctx[1] + " svelte-ejw4cs");
      add_location(label_1, file$2, 122, 0, 3540);
    },
    m: function mount(target, anchor) {
      insert_dev(target, label_1, anchor);
      append_dev(label_1, input_1);
      input_1.checked =
      /*checked*/
      ctx[0];
      /*input_1_binding*/

      ctx[12](input_1);
      append_dev(label_1, t0);
      append_dev(label_1, div);
      append_dev(label_1, t1);
      append_dev(label_1, span);

      if (default_slot) {
        default_slot.m(span, null);
      }
      /*label_1_binding*/


      ctx[13](label_1);
      current = true;

      if (!mounted) {
        dispose = [listen_dev(input_1, "change",
        /*input_1_change_handler*/
        ctx[11]), listen_dev(input_1, "input",
        /*input_handler*/
        ctx[9], false, false, false), listen_dev(input_1, "click",
        /*click_handler*/
        ctx[10], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*checked*/
      1) {
        input_1.checked =
        /*checked*/
        ctx[0];
      }

      if (!current || dirty &
      /*newBackground*/
      16 && div_class_value !== (div_class_value = "check " +
      /*newBackground*/
      ctx[4] + " svelte-ejw4cs")) {
        attr_dev(div, "class", div_class_value);
      }

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        128) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[7], dirty, null, null);
        }
      }

      if (!current || dirty &
      /*size*/
      2 && label_1_class_value !== (label_1_class_value = "switch " +
      /*size*/
      ctx[1] + " svelte-ejw4cs")) {
        attr_dev(label_1, "class", label_1_class_value);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(label_1);
      /*input_1_binding*/

      ctx[12](null);
      if (default_slot) default_slot.d(detaching);
      /*label_1_binding*/

      ctx[13](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  var _$$props$checked = $$props.checked,
      checked = _$$props$checked === void 0 ? false : _$$props$checked;
  var _$$props$type = $$props.type,
      type = _$$props$type === void 0 ? "is-primary" : _$$props$type;
  var _$$props$size = $$props.size,
      size = _$$props$size === void 0 ? "" : _$$props$size;
  var _$$props$disabled = $$props.disabled,
      disabled = _$$props$disabled === void 0 ? false : _$$props$disabled;
  var label;
  var input;
  var writable_props = ["checked", "type", "size", "disabled"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Switch> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Switch", $$slots, ['default']);

  function input_handler(event) {
    bubble($$self, event);
  }

  function click_handler(event) {
    bubble($$self, event);
  }

  function input_1_change_handler() {
    checked = this.checked;
    $$invalidate(0, checked);
  }

  function input_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(3, input = $$value);
    });
  }

  function label_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(2, label = $$value);
    });
  }

  $$self.$set = function ($$props) {
    if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    if ("type" in $$props) $$invalidate(5, type = $$props.type);
    if ("size" in $$props) $$invalidate(1, size = $$props.size);
    if ("disabled" in $$props) $$invalidate(6, disabled = $$props.disabled);
    if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      checked: checked,
      type: type,
      size: size,
      disabled: disabled,
      label: label,
      input: input,
      newBackground: newBackground
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    if ("type" in $$props) $$invalidate(5, type = $$props.type);
    if ("size" in $$props) $$invalidate(1, size = $$props.size);
    if ("disabled" in $$props) $$invalidate(6, disabled = $$props.disabled);
    if ("label" in $$props) $$invalidate(2, label = $$props.label);
    if ("input" in $$props) $$invalidate(3, input = $$props.input);
    if ("newBackground" in $$props) $$invalidate(4, newBackground = $$props.newBackground);
  };

  var newBackground;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*type*/
    32) {
       $$invalidate(4, newBackground = type && type.replace(/^is-(.*)/, "has-background-$1") || "");
    }

    if ($$self.$$.dirty &
    /*input, disabled, label*/
    76) {
       {
        if (input) {
          if (disabled) {
            label.setAttribute("disabled", "disabled");
            input.setAttribute("disabled", "disabled");
          } else {
            label.removeAttribute("disabled");
            input.removeAttribute("disabled");
          }
        }
      }
    }
  };

  return [checked, size, label, input, newBackground, type, disabled, $$scope, $$slots, input_handler, click_handler, input_1_change_handler, input_1_binding, label_1_binding];
}

var Switch = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Switch, _SvelteComponentDev);

  var _super = _createSuper$3(Switch);

  function Switch(options) {
    var _this;

    _classCallCheck(this, Switch);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      checked: 0,
      type: 5,
      size: 1,
      disabled: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Switch",
      options: options,
      id: create_fragment$2.name
    });
    return _this;
  }

  _createClass(Switch, [{
    key: "checked",
    get: function get() {
      throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "type",
    get: function get() {
      throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "size",
    get: function get() {
      throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "disabled",
    get: function get() {
      throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Switch;
}(SvelteComponentDev);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "src/components/Nav.svelte"; // (49:6) <Button tag="a" href="game">

function create_default_slot(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Play the Game!");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Play the Game!");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(49:6) <Button tag=\\\"a\\\" href=\\\"game\\\">",
    ctx: ctx
  });
  return block;
}

function create_fragment$3(ctx) {
  var nav;
  var ul;
  var li0;
  var a0;
  var h1;
  var t0;
  var a0_aria_current_value;
  var t1;
  var li1;
  var t2;
  var li2;
  var a1;
  var t3;
  var a1_aria_current_value;
  var t4;
  var li3;
  var a2;
  var t5;
  var a2_aria_current_value;
  var t6;
  var li4;
  var t7;
  var li5;
  var current;
  var button = new Button({
    props: {
      tag: "a",
      href: "game",
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      nav = element("nav");
      ul = element("ul");
      li0 = element("li");
      a0 = element("a");
      h1 = element("h1");
      t0 = text("Cellule Life");
      t1 = space();
      li1 = element("li");
      t2 = space();
      li2 = element("li");
      a1 = element("a");
      t3 = text("How it Works");
      t4 = space();
      li3 = element("li");
      a2 = element("a");
      t5 = text("High Scores");
      t6 = space();
      li4 = element("li");
      t7 = space();
      li5 = element("li");
      create_component(button.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      nav = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);
      ul = claim_element(nav_nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      li0 = claim_element(ul_nodes, "LI", {
        class: true
      });
      var li0_nodes = children(li0);
      a0 = claim_element(li0_nodes, "A", {
        class: true,
        "aria-current": true,
        href: true
      });
      var a0_nodes = children(a0);
      h1 = claim_element(a0_nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "Cellule Life");
      h1_nodes.forEach(detach_dev);
      a0_nodes.forEach(detach_dev);
      li0_nodes.forEach(detach_dev);
      t1 = claim_space(ul_nodes);
      li1 = claim_element(ul_nodes, "LI", {
        class: true
      });
      children(li1).forEach(detach_dev);
      t2 = claim_space(ul_nodes);
      li2 = claim_element(ul_nodes, "LI", {
        class: true
      });
      var li2_nodes = children(li2);
      a1 = claim_element(li2_nodes, "A", {
        "aria-current": true,
        href: true,
        class: true
      });
      var a1_nodes = children(a1);
      t3 = claim_text(a1_nodes, "How it Works");
      a1_nodes.forEach(detach_dev);
      li2_nodes.forEach(detach_dev);
      t4 = claim_space(ul_nodes);
      li3 = claim_element(ul_nodes, "LI", {
        class: true
      });
      var li3_nodes = children(li3);
      a2 = claim_element(li3_nodes, "A", {
        "aria-current": true,
        href: true,
        class: true
      });
      var a2_nodes = children(a2);
      t5 = claim_text(a2_nodes, "High Scores");
      a2_nodes.forEach(detach_dev);
      li3_nodes.forEach(detach_dev);
      t6 = claim_space(ul_nodes);
      li4 = claim_element(ul_nodes, "LI", {
        class: true
      });
      children(li4).forEach(detach_dev);
      t7 = claim_space(ul_nodes);
      li5 = claim_element(ul_nodes, "LI", {
        class: true
      });
      var li5_nodes = children(li5);
      claim_component(button.$$.fragment, li5_nodes);
      li5_nodes.forEach(detach_dev);
      ul_nodes.forEach(detach_dev);
      nav_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h1, file$3, 37, 3, 683);
      attr_dev(a0, "class", "nav-title-link svelte-qj39fg");
      attr_dev(a0, "aria-current", a0_aria_current_value = isSegmentActive(
      /*segment*/
      ctx[1]));
      attr_dev(a0, "href", ".");
      add_location(a0, file$3, 36, 6, 602);
      attr_dev(li0, "class", "svelte-qj39fg");
      add_location(li0, file$3, 36, 2, 598);
      attr_dev(li1, "class", "spacer svelte-qj39fg");
      add_location(li1, file$3, 40, 2, 720);
      attr_dev(a1, "aria-current", a1_aria_current_value = isSegmentActive(
      /*segment*/
      ctx[1], "how-it-works"));
      attr_dev(a1, "href", "how-it-works");
      attr_dev(a1, "class", "svelte-qj39fg");
      add_location(a1, file$3, 42, 6, 752);
      attr_dev(li2, "class", "svelte-qj39fg");
      add_location(li2, file$3, 42, 2, 748);
      attr_dev(a2, "aria-current", a2_aria_current_value = isSegmentActive(
      /*segment*/
      ctx[1], "scores"));
      attr_dev(a2, "href", "scores");
      attr_dev(a2, "class", "svelte-qj39fg");
      add_location(a2, file$3, 44, 6, 862);
      attr_dev(li3, "class", "svelte-qj39fg");
      add_location(li3, file$3, 44, 2, 858);
      attr_dev(li4, "class", "spacer svelte-qj39fg");
      add_location(li4, file$3, 46, 2, 955);
      attr_dev(li5, "class", "svelte-qj39fg");
      add_location(li5, file$3, 48, 2, 983);
      attr_dev(ul, "class", "svelte-qj39fg");
      add_location(ul, file$3, 35, 1, 591);
      attr_dev(nav, "class", "svelte-qj39fg");
      add_location(nav, file$3, 34, 0, 584);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav, anchor);
      append_dev(nav, ul);
      append_dev(ul, li0);
      append_dev(li0, a0);
      append_dev(a0, h1);
      append_dev(h1, t0);
      append_dev(ul, t1);
      append_dev(ul, li1);
      append_dev(ul, t2);
      append_dev(ul, li2);
      append_dev(li2, a1);
      append_dev(a1, t3);
      append_dev(ul, t4);
      append_dev(ul, li3);
      append_dev(li3, a2);
      append_dev(a2, t5);
      append_dev(ul, t6);
      append_dev(ul, li4);
      append_dev(ul, t7);
      append_dev(ul, li5);
      mount_component(button, li5, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (!current || dirty &
      /*segment*/
      2 && a0_aria_current_value !== (a0_aria_current_value = isSegmentActive(
      /*segment*/
      ctx[1]))) {
        attr_dev(a0, "aria-current", a0_aria_current_value);
      }

      if (!current || dirty &
      /*segment*/
      2 && a1_aria_current_value !== (a1_aria_current_value = isSegmentActive(
      /*segment*/
      ctx[1], "how-it-works"))) {
        attr_dev(a1, "aria-current", a1_aria_current_value);
      }

      if (!current || dirty &
      /*segment*/
      2 && a2_aria_current_value !== (a2_aria_current_value = isSegmentActive(
      /*segment*/
      ctx[1], "scores"))) {
        attr_dev(a2, "aria-current", a2_aria_current_value);
      }

      var button_changes = {};

      if (dirty &
      /*$$scope*/
      4) {
        button_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      button.$set(button_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(nav);
      destroy_component(button);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function isSegmentActive(_segment, thisSegment) {
  if (!_segment && !thisSegment || _segment === thisSegment) {
    return "page";
  }
}

function instance$3($$self, $$props, $$invalidate) {
  var segment = $$props.segment;
  var writable_props = ["segment"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Nav> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Nav", $$slots, []);

  $$self.$set = function ($$props) {
    if ("segment" in $$props) $$invalidate(1, segment = $$props.segment);
  };

  $$self.$capture_state = function () {
    return {
      Button: Button,
      isSegmentActive: isSegmentActive,
      segment: segment
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("segment" in $$props) $$invalidate(1, segment = $$props.segment);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [isSegmentActive, segment];
}

var Nav = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Nav, _SvelteComponentDev);

  var _super = _createSuper$4(Nav);

  function Nav(options) {
    var _this;

    _classCallCheck(this, Nav);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      isSegmentActive: 0,
      segment: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Nav",
      options: options,
      id: create_fragment$3.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*segment*/
    ctx[1] === undefined && !("segment" in props)) {
      console.warn("<Nav> was created without expected prop 'segment'");
    }

    return _this;
  }

  _createClass(Nav, [{
    key: "isSegmentActive",
    get: function get() {
      return isSegmentActive;
    },
    set: function set(value) {
      throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "segment",
    get: function get() {
      throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Nav;
}(SvelteComponentDev);

var SHOULD_SHOW_USERNAMES_KEY = "shouldShowUsernames";
var _shouldShowUsernames = false;

if (typeof window !== "undefined") {
  var localStorageValue = window.localStorage.getItem(SHOULD_SHOW_USERNAMES_KEY);

  if (localStorageValue) {
    _shouldShowUsernames = JSON.parse(localStorageValue);
  }
}

var shouldShowUsernames = writable(_shouldShowUsernames);
var setShouldShowUsernames = function setShouldShowUsernames(newValue) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SHOULD_SHOW_USERNAMES_KEY, newValue);
  }

  shouldShowUsernames.set(newValue);
};

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "src/components/ProfanityFilter.svelte"; // (43:4) <Switch       class="switch"       bind:checked={$shouldShowUsernames}       type="is-danger"     >

function create_default_slot_1(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Show Usernames");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Show Usernames");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(43:4) <Switch       class=\\\"switch\\\"       bind:checked={$shouldShowUsernames}       type=\\\"is-danger\\\"     >",
    ctx: ctx
  });
  return block;
} // (39:2) <Button     on:click={setShouldShowUsernames(!$shouldShowUsernames)}     size="is-large"   >


function create_default_slot$1(ctx) {
  var updating_checked;
  var current;

  function switch_1_checked_binding(value) {
    /*switch_1_checked_binding*/
    ctx[2].call(null, value);
  }

  var switch_1_props = {
    class: "switch",
    type: "is-danger",
    $$slots: {
      default: [create_default_slot_1]
    },
    $$scope: {
      ctx: ctx
    }
  };

  if (
  /*$shouldShowUsernames*/
  ctx[1] !== void 0) {
    switch_1_props.checked =
    /*$shouldShowUsernames*/
    ctx[1];
  }

  var switch_1 = new Switch({
    props: switch_1_props,
    $$inline: true
  });
  binding_callbacks.push(function () {
    return bind(switch_1, "checked", switch_1_checked_binding);
  });
  var block = {
    c: function create() {
      create_component(switch_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(switch_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(switch_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_1_changes = {};

      if (dirty &
      /*$$scope*/
      16) {
        switch_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (!updating_checked && dirty &
      /*$shouldShowUsernames*/
      2) {
        updating_checked = true;
        switch_1_changes.checked =
        /*$shouldShowUsernames*/
        ctx[1];
        add_flush_callback(function () {
          return updating_checked = false;
        });
      }

      switch_1.$set(switch_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(switch_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(switch_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(switch_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$1.name,
    type: "slot",
    source: "(39:2) <Button     on:click={setShouldShowUsernames(!$shouldShowUsernames)}     size=\\\"is-large\\\"   >",
    ctx: ctx
  });
  return block;
}

function create_fragment$4(ctx) {
  var div;
  var current;
  var button = new Button({
    props: {
      size: "is-large",
      $$slots: {
        default: [create_default_slot$1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  button.$on("click", function () {
    if (is_function(setShouldShowUsernames(!
    /*$shouldShowUsernames*/
    ctx[1]))) setShouldShowUsernames(!
    /*$shouldShowUsernames*/
    ctx[1]).apply(this, arguments);
  });
  var block = {
    c: function create() {
      div = element("div");
      create_component(button.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        tabindex: true
      });
      var div_nodes = children(div);
      claim_component(button.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "filter-wrapper svelte-1pt8hu");
      attr_dev(div, "tabindex", "-1");
      add_location(div, file$4, 33, 0, 608);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      mount_component(button, div, null);
      /*div_binding*/

      ctx[3](div);
      current = true;
    },
    p: function update(new_ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      ctx = new_ctx;
      var button_changes = {};

      if (dirty &
      /*$$scope, $shouldShowUsernames*/
      18) {
        button_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      button.$set(button_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_component(button);
      /*div_binding*/

      ctx[3](null);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$4($$self, $$props, $$invalidate) {
  var $shouldShowUsernames;
  validate_store(shouldShowUsernames, "shouldShowUsernames");
  component_subscribe($$self, shouldShowUsernames, function ($$value) {
    return $$invalidate(1, $shouldShowUsernames = $$value);
  });
  var container = $$props.container;
  onMount(function () {
    document.body.appendChild(container);
  });
  var writable_props = ["container"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ProfanityFilter> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ProfanityFilter", $$slots, []);

  function switch_1_checked_binding(value) {
    $shouldShowUsernames = value;
    shouldShowUsernames.set($shouldShowUsernames);
  }

  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(0, container = $$value);
    });
  }

  $$self.$set = function ($$props) {
    if ("container" in $$props) $$invalidate(0, container = $$props.container);
  };

  $$self.$capture_state = function () {
    return {
      onMount: onMount,
      Button: Button,
      Switch: Switch,
      shouldShowUsernames: shouldShowUsernames,
      setShouldShowUsernames: setShouldShowUsernames,
      container: container,
      $shouldShowUsernames: $shouldShowUsernames
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("container" in $$props) $$invalidate(0, container = $$props.container);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [container, $shouldShowUsernames, switch_1_checked_binding, div_binding];
}

var ProfanityFilter = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ProfanityFilter, _SvelteComponentDev);

  var _super = _createSuper$5(ProfanityFilter);

  function ProfanityFilter(options) {
    var _this;

    _classCallCheck(this, ProfanityFilter);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      container: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ProfanityFilter",
      options: options,
      id: create_fragment$4.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*container*/
    ctx[0] === undefined && !("container" in props)) {
      console.warn("<ProfanityFilter> was created without expected prop 'container'");
    }

    return _this;
  }

  _createClass(ProfanityFilter, [{
    key: "container",
    get: function get() {
      throw new Error("<ProfanityFilter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ProfanityFilter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ProfanityFilter;
}(SvelteComponentDev);

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "src/routes/_layout.svelte"; // (93:4) {:else}

function create_else_block(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text(
      /*segment*/
      ctx[0]);
    },
    l: function claim(nodes) {
      t = claim_text(nodes,
      /*segment*/
      ctx[0]);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*segment*/
      1) set_data_dev(t,
      /*segment*/
      ctx[0]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(93:4) {:else}",
    ctx: ctx
  });
  return block;
} // (91:4) {#if !segment }


function create_if_block_2$1(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Cellule Life");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Cellule Life");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(91:4) {#if !segment }",
    ctx: ctx
  });
  return block;
} // (98:4) {#if !segment }


function create_if_block_1$1(ctx) {
  var current;
  var default_slot_template =
  /*$$slots*/
  ctx[2].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[1], null);
  var block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        2) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[1], dirty, null, null);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(98:4) {#if !segment }",
    ctx: ctx
  });
  return block;
} // (104:2) {#if segment }


function create_if_block$1(ctx) {
  var main;
  var t;
  var current;
  var default_slot_template =
  /*$$slots*/
  ctx[2].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[1], null);
  var profanityfilter = new ProfanityFilter({
    $$inline: true
  });
  var block = {
    c: function create() {
      main = element("main");
      if (default_slot) default_slot.c();
      t = space();
      create_component(profanityfilter.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      main = claim_element(nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      if (default_slot) default_slot.l(main_nodes);
      main_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      claim_component(profanityfilter.$$.fragment, nodes);
      this.h();
    },
    h: function hydrate() {
      attr_dev(main, "class", "page svelte-1yzl5q2");
      add_location(main, file$5, 104, 3, 2256);
    },
    m: function mount(target, anchor) {
      insert_dev(target, main, anchor);

      if (default_slot) {
        default_slot.m(main, null);
      }

      insert_dev(target, t, anchor);
      mount_component(profanityfilter, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        2) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[1], dirty, null, null);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      transition_in(profanityfilter.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      transition_out(profanityfilter.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(main);
      if (default_slot) default_slot.d(detaching);
      if (detaching) detach_dev(t);
      destroy_component(profanityfilter, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(104:2) {#if segment }",
    ctx: ctx
  });
  return block;
}

function create_fragment$5(ctx) {
  var div4;
  var div3;
  var div0;
  var video;
  var video_src_value;
  var t0;
  var t1;
  var div2;
  var h1;
  var t2;
  var div1;
  var t3;
  var div4_class_value;
  var current;
  var nav = new Nav({
    props: {
      class: "main-nav",
      segment:
      /*segment*/
      ctx[0]
    },
    $$inline: true
  });

  function select_block_type(ctx, dirty) {
    if (!
    /*segment*/
    ctx[0]) return create_if_block_2$1;
    return create_else_block;
  }

  var current_block_type = select_block_type(ctx);
  var if_block0 = current_block_type(ctx);
  var if_block1 = !
  /*segment*/
  ctx[0] && create_if_block_1$1(ctx);
  var if_block2 =
  /*segment*/
  ctx[0] && create_if_block$1(ctx);
  var block = {
    c: function create() {
      div4 = element("div");
      div3 = element("div");
      div0 = element("div");
      video = element("video");
      t0 = space();
      create_component(nav.$$.fragment);
      t1 = space();
      div2 = element("div");
      h1 = element("h1");
      if_block0.c();
      t2 = space();
      div1 = element("div");
      if (if_block1) if_block1.c();
      t3 = space();
      if (if_block2) if_block2.c();
      this.h();
    },
    l: function claim(nodes) {
      div4 = claim_element(nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      video = claim_element(div0_nodes, "VIDEO", {
        loop: true,
        muted: true,
        autoplay: true,
        class: true,
        src: true
      });
      children(video).forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t0 = claim_space(div3_nodes);
      claim_component(nav.$$.fragment, div3_nodes);
      t1 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      h1 = claim_element(div2_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      if_block0.l(h1_nodes);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      if (if_block1) if_block1.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t3 = claim_space(div3_nodes);
      if (if_block2) if_block2.l(div3_nodes);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      video.loop = true;
      video.muted = true;
      video.autoplay = true;
      attr_dev(video, "class", "background svelte-1yzl5q2");
      if (video.src !== (video_src_value = "/cellulelife-2.mp4")) attr_dev(video, "src", video_src_value);
      add_location(video, file$5, 84, 3, 1859);
      attr_dev(div0, "class", "video-background-wrapper svelte-1yzl5q2");
      add_location(div0, file$5, 83, 2, 1817);
      attr_dev(h1, "class", "page-title svelte-1yzl5q2");
      add_location(h1, file$5, 89, 3, 2018);
      attr_dev(div1, "class", "home-page-route-wrapper svelte-1yzl5q2");
      add_location(div1, file$5, 96, 3, 2129);
      attr_dev(div2, "class", "title-wrapper svelte-1yzl5q2");
      add_location(div2, file$5, 88, 2, 1987);
      attr_dev(div3, "class", "hero-inner-wrapper svelte-1yzl5q2");
      add_location(div3, file$5, 82, 1, 1782);
      attr_dev(div4, "class", div4_class_value = "hero-wrapper " + (!
      /*segment*/
      ctx[0] && "home") + " svelte-1yzl5q2");
      add_location(div4, file$5, 81, 0, 1732);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div4, anchor);
      append_dev(div4, div3);
      append_dev(div3, div0);
      append_dev(div0, video);
      append_dev(div3, t0);
      mount_component(nav, div3, null);
      append_dev(div3, t1);
      append_dev(div3, div2);
      append_dev(div2, h1);
      if_block0.m(h1, null);
      append_dev(div2, t2);
      append_dev(div2, div1);
      if (if_block1) if_block1.m(div1, null);
      append_dev(div3, t3);
      if (if_block2) if_block2.m(div3, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var nav_changes = {};
      if (dirty &
      /*segment*/
      1) nav_changes.segment =
      /*segment*/
      ctx[0];
      nav.$set(nav_changes);

      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
        if_block0.p(ctx, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx);

        if (if_block0) {
          if_block0.c();
          if_block0.m(h1, null);
        }
      }

      if (!
      /*segment*/
      ctx[0]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*segment*/
          1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$1(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (
      /*segment*/
      ctx[0]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);

          if (dirty &
          /*segment*/
          1) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$1(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div3, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, function () {
          if_block2 = null;
        });
        check_outros();
      }

      if (!current || dirty &
      /*segment*/
      1 && div4_class_value !== (div4_class_value = "hero-wrapper " + (!
      /*segment*/
      ctx[0] && "home") + " svelte-1yzl5q2")) {
        attr_dev(div4, "class", div4_class_value);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(nav.$$.fragment, local);
      transition_in(if_block1);
      transition_in(if_block2);
      current = true;
    },
    o: function outro(local) {
      transition_out(nav.$$.fragment, local);
      transition_out(if_block1);
      transition_out(if_block2);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div4);
      destroy_component(nav);
      if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$5($$self, $$props, $$invalidate) {
  var segment = $$props.segment;
  var writable_props = ["segment"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Layout> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Layout", $$slots, ['default']);

  $$self.$set = function ($$props) {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
    if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      Nav: Nav,
      ProfanityFilter: ProfanityFilter,
      segment: segment
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [segment, $$scope, $$slots];
}

var Layout = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Layout, _SvelteComponentDev);

  var _super = _createSuper$6(Layout);

  function Layout(options) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
      segment: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Layout",
      options: options,
      id: create_fragment$5.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*segment*/
    ctx[0] === undefined && !("segment" in props)) {
      console.warn("<Layout> was created without expected prop 'segment'");
    }

    return _this;
  }

  _createClass(Layout, [{
    key: "segment",
    get: function get() {
      throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Layout;
}(SvelteComponentDev);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1$1 = globals.Error;
var file$6 = "src/routes/_error.svelte"; // (37:0) {#if dev && error.stack}

function create_if_block$2(ctx) {
  var pre;
  var t_value =
  /*error*/
  ctx[1].stack + "";
  var t;
  var block = {
    c: function create() {
      pre = element("pre");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      pre = claim_element(nodes, "PRE", {});
      var pre_nodes = children(pre);
      t = claim_text(pre_nodes, t_value);
      pre_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(pre, file$6, 37, 1, 426);
    },
    m: function mount(target, anchor) {
      insert_dev(target, pre, anchor);
      append_dev(pre, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*error*/
      2 && t_value !== (t_value =
      /*error*/
      ctx[1].stack + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(pre);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(37:0) {#if dev && error.stack}",
    ctx: ctx
  });
  return block;
}

function create_fragment$6(ctx) {
  var title_value;
  var t0;
  var h1;
  var t1;
  var t2;
  var p;
  var t3_value =
  /*error*/
  ctx[1].message + "";
  var t3;
  var t4;
  var if_block_anchor;
  document.title = title_value =
  /*status*/
  ctx[0];
  var if_block =
  /*dev*/
  ctx[2] &&
  /*error*/
  ctx[1].stack && create_if_block$2(ctx);
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text(
      /*status*/
      ctx[0]);
      t2 = space();
      p = element("p");
      t3 = text(t3_value);
      t4 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1o9r2ue\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes,
      /*status*/
      ctx[0]);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t3 = claim_text(p_nodes, t3_value);
      p_nodes.forEach(detach_dev);
      t4 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-ibl7am");
      add_location(h1, file$6, 32, 0, 357);
      attr_dev(p, "class", "svelte-ibl7am");
      add_location(p, file$6, 34, 0, 376);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      insert_dev(target, p, anchor);
      append_dev(p, t3);
      insert_dev(target, t4, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*status*/
      1 && title_value !== (title_value =
      /*status*/
      ctx[0])) {
        document.title = title_value;
      }

      if (dirty &
      /*status*/
      1) set_data_dev(t1,
      /*status*/
      ctx[0]);
      if (dirty &
      /*error*/
      2 && t3_value !== (t3_value =
      /*error*/
      ctx[1].message + "")) set_data_dev(t3, t3_value);

      if (
      /*dev*/
      ctx[2] &&
      /*error*/
      ctx[1].stack) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$2(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t4);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$6($$self, $$props, $$invalidate) {
  var status = $$props.status;
  var error = $$props.error;
  var dev = "development" === "development";
  var writable_props = ["status", "error"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Error> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Error", $$slots, []);

  $$self.$set = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  $$self.$capture_state = function () {
    return {
      status: status,
      error: error,
      dev: dev
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [status, error, dev];
}

var Error$1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Error, _SvelteComponentDev);

  var _super = _createSuper$7(Error);

  function Error(options) {
    var _this;

    _classCallCheck(this, Error);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {
      status: 0,
      error: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Error",
      options: options,
      id: create_fragment$6.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*status*/
    ctx[0] === undefined && !("status" in props)) {
      console.warn("<Error> was created without expected prop 'status'");
    }

    if (
    /*error*/
    ctx[1] === undefined && !("error" in props)) {
      console.warn("<Error> was created without expected prop 'error'");
    }

    return _this;
  }

  _createClass(Error, [{
    key: "status",
    get: function get() {
      throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Error;
}(SvelteComponentDev);

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1$2 = globals.Error;

function create_else_block$1(ctx) {
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [
  /*level1*/
  ctx[4].props];
  var switch_value =
  /*level1*/
  ctx[4].component;

  function switch_props(ctx) {
    var switch_instance_props = {};

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    var switch_instance = new switch_value(switch_props());
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_instance_changes = dirty &
      /*level1*/
      16 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
      /*level1*/
      ctx[4].props)]) : {};

      if (switch_value !== (switch_value =
      /*level1*/
      ctx[4].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(23:1) {:else}",
    ctx: ctx
  });
  return block;
} // (21:1) {#if error}


function create_if_block$3(ctx) {
  var current;
  var error_1 = new Error$1({
    props: {
      error:
      /*error*/
      ctx[0],
      status:
      /*status*/
      ctx[1]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(error_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(error_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(error_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var error_1_changes = {};
      if (dirty &
      /*error*/
      1) error_1_changes.error =
      /*error*/
      ctx[0];
      if (dirty &
      /*status*/
      2) error_1_changes.status =
      /*status*/
      ctx[1];
      error_1.$set(error_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(error_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(error_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(error_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$3.name,
    type: "if",
    source: "(21:1) {#if error}",
    ctx: ctx
  });
  return block;
} // (20:0) <Layout segment="{segments[0]}" {...level0.props}>


function create_default_slot$2(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$3, create_else_block$1];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*error*/
    ctx[0]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$2.name,
    type: "slot",
    source: "(20:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$7(ctx) {
  var current;
  var layout_spread_levels = [{
    segment:
    /*segments*/
    ctx[2][0]
  },
  /*level0*/
  ctx[3].props];
  var layout_props = {
    $$slots: {
      default: [create_default_slot$2]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < layout_spread_levels.length; i += 1) {
    layout_props = assign(layout_props, layout_spread_levels[i]);
  }

  var layout = new Layout({
    props: layout_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(layout.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(layout.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(layout, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var layout_changes = dirty &
      /*segments, level0*/
      12 ? get_spread_update(layout_spread_levels, [dirty &
      /*segments*/
      4 && {
        segment:
        /*segments*/
        ctx[2][0]
      }, dirty &
      /*level0*/
      8 && get_spread_object(
      /*level0*/
      ctx[3].props)]) : {};

      if (dirty &
      /*$$scope, error, status, level1*/
      147) {
        layout_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      layout.$set(layout_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(layout.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(layout.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(layout, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$7($$self, $$props, $$invalidate) {
  var stores = $$props.stores;
  var error = $$props.error;
  var status = $$props.status;
  var segments = $$props.segments;
  var level0 = $$props.level0;
  var _$$props$level = $$props.level1,
      level1 = _$$props$level === void 0 ? null : _$$props$level;
  var notify = $$props.notify;
  afterUpdate(notify);
  setContext(CONTEXT_KEY, stores);
  var writable_props = ["stores", "error", "status", "segments", "level0", "level1", "notify"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<App> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("App", $$slots, []);

  $$self.$set = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      afterUpdate: afterUpdate,
      CONTEXT_KEY: CONTEXT_KEY,
      Layout: Layout,
      Error: Error$1,
      stores: stores,
      error: error,
      status: status,
      segments: segments,
      level0: level0,
      level1: level1,
      notify: notify
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [error, status, segments, level0, level1, stores, notify];
}

var App = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(App, _SvelteComponentDev);

  var _super = _createSuper$8(App);

  function App(options) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {
      stores: 5,
      error: 0,
      status: 1,
      segments: 2,
      level0: 3,
      level1: 4,
      notify: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "App",
      options: options,
      id: create_fragment$7.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*stores*/
    ctx[5] === undefined && !("stores" in props)) {
      console.warn("<App> was created without expected prop 'stores'");
    }

    if (
    /*error*/
    ctx[0] === undefined && !("error" in props)) {
      console.warn("<App> was created without expected prop 'error'");
    }

    if (
    /*status*/
    ctx[1] === undefined && !("status" in props)) {
      console.warn("<App> was created without expected prop 'status'");
    }

    if (
    /*segments*/
    ctx[2] === undefined && !("segments" in props)) {
      console.warn("<App> was created without expected prop 'segments'");
    }

    if (
    /*level0*/
    ctx[3] === undefined && !("level0" in props)) {
      console.warn("<App> was created without expected prop 'level0'");
    }

    if (
    /*notify*/
    ctx[6] === undefined && !("notify" in props)) {
      console.warn("<App> was created without expected prop 'notify'");
    }

    return _this;
  }

  _createClass(App, [{
    key: "stores",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "status",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "segments",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level0",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level1",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "notify",
    get: function get() {
      throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return App;
}(SvelteComponentDev);

// This file is generated by Sapper — do not edit it!
var ignore = [];
var components = [{
  js: function js() {
    return import('./index.55c2e612.js');
  },
  css: []
}, {
  js: function js() {
    return import('./how-it-works.b13b98f1.js');
  },
  css: []
}, {
  js: function js() {
    return import('./[editCount].4fc6f678.js');
  },
  css: []
}, {
  js: function js() {
    return import('./[slug].77aa75e7.js');
  },
  css: []
}, {
  js: function js() {
    return import('./scores.0045e53b.js');
  },
  css: []
}];
var routes = function (d) {
  return [{
    // index.svelte
    pattern: /^\/$/,
    parts: [{
      i: 0
    }]
  }, {
    // how-it-works.svelte
    pattern: /^\/how-it-works\/?$/,
    parts: [{
      i: 1
    }]
  }, {
    // scores/[slug]/[editCount].svelte
    pattern: /^\/scores\/([^\/]+?)\/([^\/]+?)\/?$/,
    parts: [null, null, {
      i: 2,
      params: function params(match) {
        return {
          slug: d(match[1]),
          editCount: d(match[2])
        };
      }
    }]
  }, {
    // scores/[slug].svelte
    pattern: /^\/scores\/([^\/]+?)\/?$/,
    parts: [null, {
      i: 3,
      params: function params(match) {
        return {
          slug: d(match[1])
        };
      }
    }]
  }, {
    // scores.svelte
    pattern: /^\/scores\/?$/,
    parts: [{
      i: 4
    }]
  }];
}(decodeURIComponent);

function goto(href) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    replaceState: false
  };
  var target = select_target(new URL(href, document.baseURI));

  if (target) {
    _history[opts.replaceState ? 'replaceState' : 'pushState']({
      id: cid
    }, '', href);

    return navigate(target, null).then(function () {});
  }

  location.href = href;
  return new Promise(function (f) {}); // never resolves
}
/** Callback to inform of a value updates. */


function page_store(value) {
  var store = writable(value);
  var ready = true;

  function notify() {
    ready = true;
    store.update(function (val) {
      return val;
    });
  }

  function set(new_value) {
    ready = false;
    store.set(new_value);
  }

  function subscribe(run) {
    var old_value;
    return store.subscribe(function (value) {
      if (old_value === undefined || ready && value !== old_value) {
        run(old_value = value);
      }
    });
  }

  return {
    notify: notify,
    set: set,
    subscribe: subscribe
  };
}

var initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
var ready = false;
var root_component;
var current_token;
var root_preloaded;
var current_branch = [];
var current_query = '{}';
var stores = {
  page: page_store({}),
  preloading: writable(null),
  session: writable(initial_data && initial_data.session)
};
var $session;
var session_dirty;
stores.session.subscribe( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(value) {
    var target, token, _yield$hydrate_target, redirect, props, branch;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            $session = value;

            if (ready) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            session_dirty = true;
            target = select_target(new URL(location.href));
            token = current_token = {};
            _context.next = 8;
            return hydrate_target(target);

          case 8:
            _yield$hydrate_target = _context.sent;
            redirect = _yield$hydrate_target.redirect;
            props = _yield$hydrate_target.props;
            branch = _yield$hydrate_target.branch;

            if (!(token !== current_token)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return");

          case 14:
            _context.next = 16;
            return render(redirect, branch, props, target.page);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var prefetching = null;

function set_prefetching(href, promise) {
  prefetching = {
    href: href,
    promise: promise
  };
}

var target;

function set_target(element) {
  target = element;
}

var uid = 1;

function set_uid(n) {
  uid = n;
}

var cid;

function set_cid(n) {
  cid = n;
}

var _history = typeof history !== 'undefined' ? history : {
  pushState: function pushState(state, title, href) {},
  replaceState: function replaceState(state, title, href) {},
  scrollRestoration: ''
};

var scroll_history = {};

function extract_query(search) {
  var query = Object.create(null);

  if (search.length > 0) {
    search.slice(1).split('&').forEach(function (searchParam) {
      var _$exec = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' '))),
          _$exec2 = _slicedToArray(_$exec, 3),
          key = _$exec2[1],
          _$exec2$ = _$exec2[2],
          value = _$exec2$ === void 0 ? '' : _$exec2$;

      if (typeof query[key] === 'string') query[key] = [query[key]];
      if (_typeof(query[key]) === 'object') query[key].push(value);else query[key] = value;
    });
  }

  return query;
}

function select_target(url) {
  if (url.origin !== location.origin) return null;
  if (!url.pathname.startsWith(initial_data.baseUrl)) return null;
  var path = url.pathname.slice(initial_data.baseUrl.length);

  if (path === '') {
    path = '/';
  } // avoid accidental clashes between server routes and page routes


  if (ignore.some(function (pattern) {
    return pattern.test(path);
  })) return;

  for (var i = 0; i < routes.length; i += 1) {
    var route = routes[i];
    var match = route.pattern.exec(path);

    if (match) {
      var query = extract_query(url.search);
      var part = route.parts[route.parts.length - 1];
      var params = part.params ? part.params(match) : {};
      var page = {
        host: location.host,
        path: path,
        query: query,
        params: params
      };
      return {
        href: url.href,
        route: route,
        match: match,
        page: page
      };
    }
  }
}

function handle_error(url) {
  var _location = location,
      host = _location.host,
      pathname = _location.pathname,
      search = _location.search;
  var session = initial_data.session,
      preloaded = initial_data.preloaded,
      status = initial_data.status,
      error = initial_data.error;

  if (!root_preloaded) {
    root_preloaded = preloaded && preloaded[0];
  }

  var props = {
    error: error,
    status: status,
    session: session,
    level0: {
      props: root_preloaded
    },
    level1: {
      props: {
        status: status,
        error: error
      },
      component: Error$1
    },
    segments: preloaded
  };
  var query = extract_query(search);
  render(null, [], props, {
    host: host,
    path: pathname,
    query: query,
    params: {}
  });
}

function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}

function navigate(_x2, _x3, _x4, _x5) {
  return _navigate.apply(this, arguments);
}

function _navigate() {
  _navigate = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(target, id, noscroll, hash) {
    var current_scroll, loaded, token, _yield$loaded, redirect, props, branch, scroll, deep_linked;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (id) {
              // popstate or initial navigation
              cid = id;
            } else {
              current_scroll = scroll_state(); // clicked on a link. preserve scroll state

              scroll_history[cid] = current_scroll;
              id = cid = ++uid;
              scroll_history[cid] = noscroll ? current_scroll : {
                x: 0,
                y: 0
              };
            }

            cid = id;
            if (root_component) stores.preloading.set(true);
            loaded = prefetching && prefetching.href === target.href ? prefetching.promise : hydrate_target(target);
            prefetching = null;
            token = current_token = {};
            _context2.next = 8;
            return loaded;

          case 8:
            _yield$loaded = _context2.sent;
            redirect = _yield$loaded.redirect;
            props = _yield$loaded.props;
            branch = _yield$loaded.branch;

            if (!(token !== current_token)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return");

          case 14:
            _context2.next = 16;
            return render(redirect, branch, props, target.page);

          case 16:
            if (document.activeElement) document.activeElement.blur();

            if (!noscroll) {
              scroll = scroll_history[id];

              if (hash) {
                // scroll is an element id (from a hash), we need to compute y.
                deep_linked = document.getElementById(hash.slice(1));

                if (deep_linked) {
                  scroll = {
                    x: 0,
                    y: deep_linked.getBoundingClientRect().top + scrollY
                  };
                }
              }

              scroll_history[cid] = scroll;
              if (scroll) scrollTo(scroll.x, scroll.y);
            }

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _navigate.apply(this, arguments);
}

function render(_x6, _x7, _x8, _x9) {
  return _render.apply(this, arguments);
}

function _render() {
  _render = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(redirect, branch, props, page) {
    var _start, end;

    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!redirect) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", goto(redirect.location, {
              replaceState: true
            }));

          case 2:
            stores.page.set(page);
            stores.preloading.set(false);

            if (!root_component) {
              _context3.next = 8;
              break;
            }

            root_component.$set(props);
            _context3.next = 18;
            break;

          case 8:
            props.stores = {
              page: {
                subscribe: stores.page.subscribe
              },
              preloading: {
                subscribe: stores.preloading.subscribe
              },
              session: stores.session
            };
            _context3.next = 11;
            return root_preloaded;

          case 11:
            _context3.t0 = _context3.sent;
            props.level0 = {
              props: _context3.t0
            };
            props.notify = stores.page.notify; // first load — remove SSR'd <head> contents

            _start = document.querySelector('#sapper-head-start');
            end = document.querySelector('#sapper-head-end');

            if (_start && end) {
              while (_start.nextSibling !== end) {
                detach$1(_start.nextSibling);
              }

              detach$1(_start);
              detach$1(end);
            }

            root_component = new App({
              target: target,
              props: props,
              hydrate: true
            });

          case 18:
            current_branch = branch;
            current_query = JSON.stringify(page.query);
            ready = true;
            session_dirty = false;

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _render.apply(this, arguments);
}

function part_changed(i, segment, match, stringified_query) {
  // TODO only check query string changes for preload functions
  // that do in fact depend on it (using static analysis or
  // runtime instrumentation)
  if (stringified_query !== current_query) return true;
  var previous = current_branch[i];
  if (!previous) return false;
  if (segment !== previous.segment) return true;

  if (previous.match) {
    if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
      return true;
    }
  }
}

function hydrate_target(_x10) {
  return _hydrate_target.apply(this, arguments);
}

function _hydrate_target() {
  _hydrate_target = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(target) {
    var route, page, segments, _redirect, props, preload_context, branch, l, stringified_query, match, segment_dirty;

    return regenerator.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            route = target.route, page = target.page;
            segments = page.path.split('/').filter(Boolean);
            _redirect = null;
            props = {
              error: null,
              status: 200,
              segments: [segments[0]]
            };
            preload_context = {
              fetch: function (_fetch) {
                function fetch(_x11, _x12) {
                  return _fetch.apply(this, arguments);
                }

                fetch.toString = function () {
                  return _fetch.toString();
                };

                return fetch;
              }(function (url, opts) {
                return fetch(url, opts);
              }),
              redirect: function redirect(statusCode, location) {
                if (_redirect && (_redirect.statusCode !== statusCode || _redirect.location !== location)) {
                  throw new Error("Conflicting redirects");
                }

                _redirect = {
                  statusCode: statusCode,
                  location: location
                };
              },
              error: function error(status, _error) {
                props.error = typeof _error === 'string' ? new Error(_error) : _error;
                props.status = status;
              }
            };

            if (!root_preloaded) {
              root_preloaded = initial_data.preloaded[0] || preload.call(preload_context, {
                host: page.host,
                path: page.path,
                query: page.query,
                params: {}
              }, $session);
            }

            l = 1;
            _context5.prev = 7;
            stringified_query = JSON.stringify(page.query);
            match = route.pattern.exec(page.path);
            segment_dirty = false;
            _context5.next = 13;
            return Promise.all(route.parts.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(part, i) {
                var segment, j, _yield$load_component, component, preload, preloaded;

                return regenerator.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        segment = segments[i];
                        if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;
                        props.segments[l] = segments[i + 1]; // TODO make this less confusing

                        if (part) {
                          _context4.next = 5;
                          break;
                        }

                        return _context4.abrupt("return", {
                          segment: segment
                        });

                      case 5:
                        j = l++;

                        if (!(!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i)) {
                          _context4.next = 8;
                          break;
                        }

                        return _context4.abrupt("return", current_branch[i]);

                      case 8:
                        segment_dirty = false;
                        _context4.next = 11;
                        return load_component(components[part.i]);

                      case 11:
                        _yield$load_component = _context4.sent;
                        component = _yield$load_component.default;
                        preload = _yield$load_component.preload;

                        if (!(ready || !initial_data.preloaded[i + 1])) {
                          _context4.next = 25;
                          break;
                        }

                        if (!preload) {
                          _context4.next = 21;
                          break;
                        }

                        _context4.next = 18;
                        return preload.call(preload_context, {
                          host: page.host,
                          path: page.path,
                          query: page.query,
                          params: part.params ? part.params(target.match) : {}
                        }, $session);

                      case 18:
                        _context4.t0 = _context4.sent;
                        _context4.next = 22;
                        break;

                      case 21:
                        _context4.t0 = {};

                      case 22:
                        preloaded = _context4.t0;
                        _context4.next = 26;
                        break;

                      case 25:
                        preloaded = initial_data.preloaded[i + 1];

                      case 26:
                        return _context4.abrupt("return", props["level".concat(j)] = {
                          component: component,
                          props: preloaded,
                          segment: segment,
                          match: match,
                          part: part.i
                        });

                      case 27:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x13, _x14) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 13:
            branch = _context5.sent;
            _context5.next = 21;
            break;

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](7);
            props.error = _context5.t0;
            props.status = 500;
            branch = [];

          case 21:
            return _context5.abrupt("return", {
              redirect: _redirect,
              props: props,
              branch: branch
            });

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[7, 16]]);
  }));
  return _hydrate_target.apply(this, arguments);
}

function load_css(chunk) {
  var href = "client/".concat(chunk);
  if (document.querySelector("link[href=\"".concat(href, "\"]"))) return;
  return new Promise(function (fulfil, reject) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    link.onload = function () {
      return fulfil();
    };

    link.onerror = reject;
    document.head.appendChild(link);
  });
}

function load_component(component) {
  // TODO this is temporary — once placeholders are
  // always rewritten, scratch the ternary
  var promises = typeof component.css === 'string' ? [] : component.css.map(load_css);
  promises.unshift(component.js());
  return Promise.all(promises).then(function (values) {
    return values[0];
  });
}

function detach$1(node) {
  node.parentNode.removeChild(node);
}

function prefetch(href) {
  var target = select_target(new URL(href, document.baseURI));

  if (target) {
    if (!prefetching || href !== prefetching.href) {
      set_prefetching(href, hydrate_target(target));
    }

    return prefetching.promise;
  }
}

function start(opts) {
  if ('scrollRestoration' in _history) {
    _history.scrollRestoration = 'manual';
  } // Adopted from Nuxt.js
  // Reset scrollRestoration to auto when leaving page, allowing page reload
  // and back-navigation from other pages to use the browser to restore the
  // scrolling position.


  addEventListener('beforeunload', function () {
    _history.scrollRestoration = 'auto';
  }); // Setting scrollRestoration to manual again when returning to this page.

  addEventListener('load', function () {
    _history.scrollRestoration = 'manual';
  });
  set_target(opts.target);
  addEventListener('click', handle_click);
  addEventListener('popstate', handle_popstate); // prefetch

  addEventListener('touchstart', trigger_prefetch);
  addEventListener('mousemove', handle_mousemove);
  return Promise.resolve().then(function () {
    var _location2 = location,
        hash = _location2.hash,
        href = _location2.href;

    _history.replaceState({
      id: uid
    }, '', href);

    var url = new URL(location.href);
    if (initial_data.error) return handle_error();
    var target = select_target(url);
    if (target) return navigate(target, uid, true, hash);
  });
}

var mousemove_timeout;

function handle_mousemove(event) {
  clearTimeout(mousemove_timeout);
  mousemove_timeout = setTimeout(function () {
    trigger_prefetch(event);
  }, 20);
}

function trigger_prefetch(event) {
  var a = find_anchor(event.target);
  if (!a || a.rel !== 'prefetch') return;
  prefetch(a.href);
}

function handle_click(event) {
  // Adapted from https://github.com/visionmedia/page.js
  // MIT license https://github.com/visionmedia/page.js#license
  if (which(event) !== 1) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey) return;
  if (event.defaultPrevented) return;
  var a = find_anchor(event.target);
  if (!a) return;
  if (!a.href) return; // check if link is inside an svg
  // in this case, both href and target are always inside an object

  var svg = _typeof(a.href) === 'object' && a.href.constructor.name === 'SVGAnimatedString';
  var href = String(svg ? a.href.baseVal : a.href);

  if (href === location.href) {
    if (!location.hash) event.preventDefault();
    return;
  } // Ignore if tag has
  // 1. 'download' attribute
  // 2. rel='external' attribute


  if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return; // Ignore if <a> has a target

  if (svg ? a.target.baseVal : a.target) return;
  var url = new URL(href); // Don't handle hash changes

  if (url.pathname === location.pathname && url.search === location.search) return;
  var target = select_target(url);

  if (target) {
    var noscroll = a.hasAttribute('sapper-noscroll');
    navigate(target, null, noscroll, url.hash);
    event.preventDefault();

    _history.pushState({
      id: cid
    }, '', url.href);
  }
}

function which(event) {
  return event.which === null ? event.button : event.which;
}

function find_anchor(node) {
  while (node && node.nodeName.toUpperCase() !== 'A') {
    node = node.parentNode;
  } // SVG <a> elements have a lowercase name


  return node;
}

function handle_popstate(event) {
  scroll_history[cid] = scroll_state();

  if (event.state) {
    var url = new URL(location.href);

    var _target = select_target(url);

    if (_target) {
      navigate(_target, event.state.id);
    } else {
      location.href = location.href;
    }
  } else {
    // hashchange
    set_uid(uid + 1);
    set_cid(uid);

    _history.replaceState({
      id: cid
    }, '', location.href);
  }
}

start({
  target: document.querySelector("#sapper")
});

export { create_slot as $, claim_space as A, claim_text as B, claim_component as C, mount_component as D, _slicedToArray as E, get_spread_object as F, transition_in as G, transition_out as H, destroy_component as I, _createClass as J, globals as K, onMount as L, afterUpdate as M, binding_callbacks as N, validate_each_argument as O, validate_store as P, shouldShowUsernames as Q, component_subscribe as R, SvelteComponentDev as S, set_data_dev as T, destroy_each as U, _asyncToGenerator as V, regenerator as W, _toConsumableArray as X, group_outros as Y, check_outros as Z, _inherits as _, assign as a, createEventDispatcher as a0, update_slot as a1, null_to_empty as a2, select_value as a3, add_render_callback as a4, select_option as a5, listen_dev as a6, prop_dev as a7, Button as a8, setShouldShowUsernames as a9, svg_element as b, claim_element as c, dispatch_dev as d, exclude_internal_props as e, children as f, detach_dev as g, attr_dev as h, init as i, add_location as j, set_svg_attributes as k, insert_dev as l, append_dev as m, get_spread_update as n, noop as o, _getPrototypeOf as p, _possibleConstructorReturn as q, _classCallCheck as r, safe_not_equal as s, _assertThisInitialized as t, space as u, validate_slots as v, element as w, text as x, create_component as y, query_selector_all as z };
