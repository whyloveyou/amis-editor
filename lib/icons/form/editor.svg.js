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
var SvgEditor = function SvgEditor(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon"
  }, props), _g || (_g = /*#__PURE__*/React__namespace.createElement("g", {
    fill: "none",
    fillRule: "evenodd",
    strokeLinejoin: "round",
    stroke: "currentColor"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M2 2h12v12H2z"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    d: "M5.768 6.232 4 8l1.768 1.768M10.232 6.232 12 8l-1.768 1.768M8.5 5.5l-1 5"
  }))));
};

exports["default"] = SvgEditor;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
