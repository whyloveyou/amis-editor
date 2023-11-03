/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import * as React from 'react';

var _g;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgQrcode = function SvgQrcode(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon"
  }, props), _g || (_g = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd",
    strokeLinejoin: "round",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2z"
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    d: "M9 9v5M11.5 9v5M14 9v5"
  }))));
};

export { SvgQrcode as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
