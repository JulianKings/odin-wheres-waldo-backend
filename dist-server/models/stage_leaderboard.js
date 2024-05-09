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
  hour: {
    type: Number,
    required: true
  },
  minute: {
    type: Number,
    required: true
  },
  second: {
    type: Number,
    required: true
  }
});
var stageLeaderboardModel = _mongoose["default"].model("stage_leaderboard", stageSchema);
var _default = exports["default"] = stageLeaderboardModel;