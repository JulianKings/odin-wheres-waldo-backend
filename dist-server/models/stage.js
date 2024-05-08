"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var stageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});
var stageModel = _mongoose["default"].model("stage", stageSchema);
var _default = exports["default"] = stageModel;