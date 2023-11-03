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
var SvgStatic = function SvgStatic(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon"
  }, props), _g || (_g = /*#__PURE__*/React__namespace.createElement("g", {
    fill: "none",
    fillRule: "evenodd",
    stroke: "currentColor"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinejoin: "round",
    d: "M1.5 3h13v10h-13z"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    d: "M7.957 6.537a.53.53 0 0 0 .377-.144.502.502 0 0 0 .158-.378.507.507 0 0 0-.15-.37.546.546 0 0 0-.385-.145.53.53 0 0 0-.378.144.482.482 0 0 0-.151.371c0 .151.048.275.15.378a.53.53 0 0 0 .379.144Zm.391 3.963V6.95h-.783v3.55h.783Z",
    strokeWidth: 0.2,
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
};

exports["default"] = SvgStatic;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
