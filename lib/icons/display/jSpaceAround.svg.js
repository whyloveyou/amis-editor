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
var SvgJSpaceAround = function SvgJSpaceAround(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    viewBox: "0 0 16 17",
    className: "icon"
  }, props), _path || (_path = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M2 0h1v17H2V0zm0 3.5h1v10H2v-10zM13 0h1v17h-1V0zm0 3.5h1v10h-1v-10z",
    opacity: 0.5
  })), _path2 || (_path2 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M11 4h5v9h-5z"
  })), _path3 || (_path3 = /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.4,
    d: "M1 5h3v7H1z"
  })), _path4 || (_path4 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M1 5v7h3V5H1zM0 4h5v9H0V4z"
  })));
};

exports["default"] = SvgJSpaceAround;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
