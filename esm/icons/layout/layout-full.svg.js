/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import * as React from 'react';

var _defs, _g;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgLayoutFull = function SvgLayoutFull(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 34 34",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    className: "icon"
  }, props), _defs || (_defs = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("path", {
    id: "layout-full_svg__a",
    d: "M4.5 4h26v26h-26z"
  }), /*#__PURE__*/React.createElement("mask", {
    id: "layout-full_svg__b",
    maskContentUnits: "userSpaceOnUse",
    maskUnits: "objectBoundingBox",
    x: 0,
    y: 0,
    width: 26,
    height: 26,
    fill: "#fff"
  }, /*#__PURE__*/React.createElement("use", {
    xlinkHref: "#layout-full_svg__a"
  })))), _g || (_g = /*#__PURE__*/React.createElement("g", {
    fillRule: "nonzero",
    stroke: "currentColor",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    strokeWidth: 2,
    x: 1,
    y: 1,
    width: 32,
    height: 32,
    rx: 1
  }), /*#__PURE__*/React.createElement("use", {
    mask: "url(#layout-full_svg__b)",
    strokeWidth: 4,
    strokeDasharray: 2,
    xlinkHref: "#layout-full_svg__a"
  }))));
};

export { SvgLayoutFull as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
