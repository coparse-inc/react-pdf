"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Message;

var _react = _interopRequireDefault(require("react"));

function Message(_ref) {
  var children = _ref.children,
      type = _ref.type;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-pdf__message react-pdf__message--".concat(type)
  }, children);
}