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
var SvgTreeSelect = function SvgTreeSelect(props) {
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
    d: "M2.5 1.5h11V6h-11z"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    d: "m11.5 3.185-1.06 1.061-1.061-1.06M3.5 6v7.5"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    d: "M7.5 8.5h6v2h-6zM7.5 12.5h6v2h-6z"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    d: "M3.5 9.5h2M3.5 13.5h2"
  }))));
};

exports["default"] = SvgTreeSelect;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
