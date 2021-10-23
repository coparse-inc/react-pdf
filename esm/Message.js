import React from 'react';
export default function Message(_ref) {
  var children = _ref.children,
      type = _ref.type;
  return /*#__PURE__*/React.createElement("div", {
    className: "react-pdf__message react-pdf__message--".concat(type)
  }, children);
}