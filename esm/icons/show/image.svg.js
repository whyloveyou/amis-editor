/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import * as React from 'react';

var _g;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgImage = function SvgImage(props) {
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
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 5,
    cy: 5,
    r: 1
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    d: "m2 12 3-3 2 2 4-4 3 3"
  }))));
};

export { SvgImage as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
