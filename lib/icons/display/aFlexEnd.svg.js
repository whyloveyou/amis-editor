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

var _path, _path2, _path3, _path4;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgAFlexEnd = function SvgAFlexEnd(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 21 18",
    className: "icon"
  }, props), _path || (_path = /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.5,
    d: "M0 17h21v1H0z"
  })), _path2 || (_path2 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M11 7h5v9h-5z"
  })), _path3 || (_path3 = /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.4,
    d: "M6 8h3v7H6z"
  })), _path4 || (_path4 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M6 8v7h3V8H6zM5 7h5v9H5V7z"
  })));
};

exports["default"] = SvgAFlexEnd;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
