/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import * as React from 'react';

var _g;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgEditor = function SvgEditor(props) {
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
    d: "M2 2h12v12H2z"
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    d: "M5.768 6.232 4 8l1.768 1.768M10.232 6.232 12 8l-1.768 1.768M8.5 5.5l-1 5"
  }))));
};

export { SvgEditor as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
