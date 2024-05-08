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
  stage: {
    type: Schema.Types.ObjectId,
    ref: "stage",
    required: true
  },
  min_x: {
    type: Number,
    required: true
  },
  max_x: {
    type: Number,
    required: true
  },
  min_y: {
    type: Number,
    required: true
  },
  max_y: {
    type: Number,
    required: true
  }
});
var stageCharacterModel = _mongoose["default"].model("stage_character", stageSchema);
var _default = exports["default"] = stageCharacterModel;