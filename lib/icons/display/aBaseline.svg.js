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
var SvgABaseline = function SvgABaseline(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    fill: "currentColor",
    viewBox: "0 0 21 11",
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon"
  }, props), _path || (_path = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M0 5h21v1H0V5zm4.5 0h6v1h-6V5zm6 0h6v1h-6V5z",
    opacity: 0.5
  })), _path2 || (_path2 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M11 1h5v9h-5V1zm1 1h3v3h-3V2z"
  })), _path3 || (_path3 = /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.4,
    d: "M6 5h3v5H6z"
  })), _path4 || (_path4 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M6 3v7h3V3H6zM5 2h5v9H5V2z"
  })));
};

exports["default"] = SvgABaseline;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
