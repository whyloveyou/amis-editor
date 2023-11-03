/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespace(e) {
   if (e && e.__esModule) return e;
   var n = Object.create(null);
   if (e) {
      Object.keys(e).forEach(function (k) {
         if (k !== 'default') {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
               enumerable: true,
               get: function () { return e[k]; }
            });
         }
      });
   }
   n["default"] = e;
   return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var _g;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgLayout2Cols = function SvgLayout2Cols(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    viewBox: "0 0 34 34",
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon"
  }, props), _g || (_g = /*#__PURE__*/React__namespace.createElement("g", {
    fillRule: "nonzero",
    stroke: "currentColor",
    strokeWidth: 2,
    fill: "none"
  }, /*#__PURE__*/React__namespace.createElement("rect", {
    x: 1,
    y: 1,
    width: 32,
    height: 32,
    rx: 1
  }), /*#__PURE__*/React__namespace.createElement("path", {
    d: "M16.5 1.5v32",
    strokeDasharray: 0
  }))));
};

exports["default"] = SvgLayout2Cols;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
