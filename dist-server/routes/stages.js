"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _stageController = require("../controllers/stageController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/all', _stageController.stages_all);
router.get('/children/:id', _stageController.stages_get_children);
router.post('/add_winner', _stageController.stage_post_winner);
router.get('/leaderboard/:id', _stageController.stages_get_leaderboard);
router.post('/add_stage', _stageController.stage_post_add);
var _default = exports["default"] = router;