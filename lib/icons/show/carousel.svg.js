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
var SvgCarousel = function SvgCarousel(props) {
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
    d: "M3.5 2.5h9v11h-9z"
  }), /*#__PURE__*/React__namespace.createElement("circle", {
    cx: 6.5,
    cy: 6,
    r: 1
  }), /*#__PURE__*/React__namespace.createElement("path", {
    d: "M13.022 4H14.5v8h-1.48M2.998 12H1.5V4h1.496M3.5 9.5a2.828 2.828 0 0 0 4 0 3.45 3.45 0 0 1 4.353-.431l.647.431h0",
    strokeLinecap: "round"
  }))));
};

exports["default"] = SvgCarousel;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
