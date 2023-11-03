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
var SvgProgress = function SvgProgress(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon"
  }, props), _g || (_g = /*#__PURE__*/React__namespace.createElement("g", {
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M10.964 4.464 14.5 8l-3.536 3.536M6.168 4.464 9.703 8l-3.535 3.536M1.5 4.464 5.036 8 1.5 11.536"
  }))));
};

exports["default"] = SvgProgress;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
