"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendTime = appendTime;
exports.obtainTime = obtainTime;
exports.updateTime = updateTime;
function appendTime(hashDictionary, time) {
  var timeId = generateId(16);
  var timeObject = {
    id: timeId,
    time: time
  };
  hashDictionary.push(timeObject);
  return timeId;
}
function obtainTime(hashDictionary, id) {
  return hashDictionary.find(function (time) {
    return time.id === id;
  });
}
function updateTime(hashDictionary, id, time) {
  var currentTime = hashDictionary.find(function (time) {
    return time.id === id;
  });
  if (currentTime) {
    currentTime.finished = time;
    return true;
  } else {
    return false;
  }
}
function generateId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}