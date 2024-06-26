"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stages_update_time = exports.stages_get_leaderboard = exports.stages_get_children = exports.stages_all = exports.stage_post_winner = exports.stage_post_add = void 0;
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _expressValidator = require("express-validator");
var _stage = _interopRequireDefault(require("../models/stage"));
var _stage_character = _interopRequireDefault(require("../models/stage_character"));
var _stage_leaderboard = _interopRequireDefault(require("../models/stage_leaderboard"));
var _hashManager = require("../util/hashManager");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var stages_all = exports.stages_all = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var allStages, responseObject;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _stage["default"].find({
            approved: true
          }).sort({
            timestamp: 1
          }).exec();
        case 2:
          allStages = _context.sent;
          responseObject = {
            responseStatus: 'validRequest',
            stages: allStages
          };
          return _context.abrupt("return", res.json(responseObject));
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var stages_get_children = exports.stages_get_children = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var _responseObject, stageChildren, timeId, responseObject;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(req.params.id.length < 24)) {
            _context2.next = 3;
            break;
          }
          // No results
          _responseObject = {
            responseStatus: 'stageNotFound'
          };
          return _context2.abrupt("return", res.json(_responseObject));
        case 3:
          _context2.next = 5;
          return _stage_character["default"].find({
            stage: req.params.id
          }).exec();
        case 5:
          stageChildren = _context2.sent;
          timeId = (0, _hashManager.appendTime)(req.app.settings.hash_dictionary, new Date());
          responseObject = {
            responseStatus: 'validRequest',
            stageChildren: stageChildren,
            time_id: timeId
          };
          return _context2.abrupt("return", res.json(responseObject));
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
var stages_update_time = exports.stages_update_time = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var responseObject, currentTime, stageTime, timeObject, _responseObject2, _responseObject3;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!(req.params.id.length < 16)) {
            _context3.next = 3;
            break;
          }
          // No results
          responseObject = {
            responseStatus: 'timeNotFound'
          };
          return _context3.abrupt("return", res.json(responseObject));
        case 3:
          currentTime = new Date();
          stageTime = (0, _hashManager.updateTime)(req.app.settings.hash_dictionary, req.params.id, currentTime);
          if (!stageTime) {
            _context3.next = 11;
            break;
          }
          timeObject = (0, _hashManager.obtainTime)(req.app.settings.hash_dictionary, req.params.id);
          _responseObject2 = {
            responseStatus: 'validRequest',
            time_id: req.params.id,
            finished_date: timeObject.finished,
            started_date: timeObject.time
          };
          return _context3.abrupt("return", res.json(_responseObject2));
        case 11:
          _responseObject3 = {
            responseStatus: 'timeNotFound'
          };
          return _context3.abrupt("return", res.json(_responseObject3));
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
var stage_post_winner = exports.stage_post_winner = [
// Validate and sanitize fields.
(0, _expressValidator.body)("name", "name must not be empty.").trim().isLength({
  min: 1
}).isLength({
  max: 32
}).escape(), (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var errors, findEntry, timeObject, timeDiff, seconds, minutes, finalMinutes, hours, time, newStage, responseObject, lessTime, updateEntry, _responseObject4, _responseObject5;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          errors = (0, _expressValidator.validationResult)(req);
          if (!errors.isEmpty()) {
            _context4.next = 33;
            break;
          }
          _context4.next = 4;
          return _stage_leaderboard["default"].findOne({
            name: req.body.name,
            stage: req.body.stage
          });
        case 4:
          findEntry = _context4.sent;
          // process time
          timeObject = (0, _hashManager.obtainTime)(req.app.settings.hash_dictionary, req.body.time);
          if (!(timeObject && timeObject.finished)) {
            _context4.next = 33;
            break;
          }
          timeDiff = Math.ceil(Math.abs(Date.parse(timeObject.finished) - Date.parse(timeObject.time)) / 1000);
          seconds = timeDiff > 60 ? timeDiff % 60 : timeDiff;
          minutes = timeDiff > 60 ? Math.trunc(timeDiff / 60) : 0;
          finalMinutes = minutes > 60 ? minutes % 60 : minutes;
          hours = minutes > 60 ? Math.trunc(minutes / 60) : 0;
          time = {
            second: seconds,
            minute: finalMinutes,
            hour: hours
          };
          if (findEntry) {
            _context4.next = 21;
            break;
          }
          // add new leaderboard entry
          newStage = new _stage_leaderboard["default"]({
            name: req.body.name,
            stage: req.body.stage,
            hour: time.hour,
            minute: time.minute,
            second: time.second
          });
          _context4.next = 17;
          return newStage.save();
        case 17:
          responseObject = {
            responseStatus: 'validWinner'
          };
          res.json(responseObject);
          _context4.next = 33;
          break;
        case 21:
          lessTime = false;
          if (time.hour < findEntry.hour) {
            lessTime = true;
          } else if (time.hour === findEntry.hour) {
            if (time.minute < findEntry.minute) {
              lessTime = true;
            } else if (time.minute === findEntry.minute) {
              if (time.second < findEntry.second) {
                lessTime = true;
              }
            }
          }
          if (!lessTime) {
            _context4.next = 31;
            break;
          }
          // update new leaderboard entry
          updateEntry = new _stage_leaderboard["default"]({
            name: findEntry.name,
            stage: findEntry.stage,
            hour: time.hour,
            minute: time.minute,
            second: time.second,
            _id: findEntry._id
          });
          _context4.next = 27;
          return _stage_leaderboard["default"].findByIdAndUpdate(findEntry._id, updateEntry, {});
        case 27:
          _responseObject4 = {
            responseStatus: 'validUpdateWinner'
          };
          res.json(_responseObject4);
          _context4.next = 33;
          break;
        case 31:
          _responseObject5 = {
            responseStatus: 'invalidUpdateWinner'
          };
          res.json(_responseObject5);
        case 33:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}())];
var stages_get_leaderboard = exports.stages_get_leaderboard = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var _responseObject6, stageLeaderboard, responseObject;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!(req.params.id.length < 24)) {
            _context5.next = 3;
            break;
          }
          // No results
          _responseObject6 = {
            responseStatus: 'stageNotFound'
          };
          return _context5.abrupt("return", res.json(_responseObject6));
        case 3:
          _context5.next = 5;
          return _stage_leaderboard["default"].find({
            stage: req.params.id
          }).sort({
            hour: 1,
            minute: 1,
            second: 1
          }).exec();
        case 5:
          stageLeaderboard = _context5.sent;
          responseObject = {
            responseStatus: 'validRequest',
            stageLeaderboard: stageLeaderboard
          };
          return _context5.abrupt("return", res.json(responseObject));
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
var stage_post_add = exports.stage_post_add = [
// Validate and sanitize fields.
(0, _expressValidator.body)("name", "Please input a valid stage name.").trim().isLength({
  min: 1
}).isLength({
  max: 128
}).escape(), (0, _expressValidator.body)("imageUrl", "Please input a valid image.").trim().isLength({
  min: 1
}), (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var errors, newStage, stageData, addCharacters, responseObject, _responseObject7, _responseObject8;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          errors = (0, _expressValidator.validationResult)(req);
          if (!errors.isEmpty()) {
            _context6.next = 19;
            break;
          }
          // add new leaderboard entry
          newStage = new _stage["default"]({
            name: req.body.name,
            image_url: req.body.imageUrl,
            timestamp: new Date(),
            approved: false
          });
          _context6.next = 5;
          return newStage.save();
        case 5:
          stageData = _context6.sent;
          if (!stageData) {
            _context6.next = 15;
            break;
          }
          addCharacters = [];
          req.body.characters.forEach(function (character) {
            var formattedName = character.name.toLowerCase().trim();
            var newCharacter = new _stage_character["default"]({
              name: character.name,
              class_name: formattedName,
              stage: stageData._id,
              min_x: character.position.relativeX - 2,
              max_x: character.position.relativeX + 2,
              min_y: character.position.y - 19,
              max_y: character.position.y + 19
            });
            addCharacters.push(newCharacter.save());
          });
          _context6.next = 11;
          return Promise.all(addCharacters);
        case 11:
          responseObject = {
            responseStatus: 'stageAdded'
          };
          res.json(responseObject);
          _context6.next = 17;
          break;
        case 15:
          _responseObject7 = {
            responseStatus: 'stageAddError',
            errors: ['Could not create the stage (database error)']
          };
          res.json(_responseObject7);
        case 17:
          _context6.next = 21;
          break;
        case 19:
          _responseObject8 = {
            responseStatus: 'stageAddError',
            errors: errors.array()
          };
          res.json(_responseObject8);
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}())];