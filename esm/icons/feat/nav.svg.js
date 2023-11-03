/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import * as React from 'react';

var _path;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgNav = function SvgNav(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon"
  }, props), _path || (_path = /*#__PURE__*/React.createElement("path", {
    stroke: "currentColor",
    d: "m8 1.5 5.5 13-5.5-3-5.5 3z",
    fill: "none",
    fillRule: "evenodd",
    strokeLinejoin: "round"
  })));
};

export { SvgNav as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
