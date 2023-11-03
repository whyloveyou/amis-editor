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
var SvgDcolumnReverse = function SvgDcolumnReverse(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    viewBox: "0 0 9 18",
    className: "icon",
    style: {
      verticalAlign: "middle"
    }
  }, props), _g || (_g = /*#__PURE__*/React__namespace.createElement("g", {
    fillRule: "evenodd"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M0 6h9v5H0zm5 9v-3H4v3H2l2.5 3L7 15H5z"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.4,
    d: "M1 1h7v3H1z",
    "data-spm-anchor-id": "a2q5o.26736379.0.i51.35962a19sy6kFy"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    d: "M1 1v3h7V1H1zM0 0h9v5H0V0z"
  }))));
};

exports["default"] = SvgDcolumnReverse;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
