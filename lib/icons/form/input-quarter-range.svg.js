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
var SvgInputQuarterRange = function SvgInputQuarterRange(props) {
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
    d: "M1.5 3h13v11h-13z"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5 2v2M11 2v2M1.5 6.002h13"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    d: "M4.7 11.799v-3.57h-.44c-.12.125-.27.24-.45.35-.18.1-.35.17-.51.21v.58c.33-.095.6-.24.815-.435v2.865H4.7ZM11.405 11.869c.39 0 .705-.11.945-.325.23-.21.345-.48.345-.81 0-.21-.06-.385-.18-.52-.11-.13-.275-.225-.485-.29.395-.13.595-.39.595-.78 0-.31-.11-.55-.325-.725-.22-.175-.515-.26-.875-.26-.35 0-.64.095-.865.295-.24.2-.37.48-.4.84h.575c.02-.215.09-.375.21-.48.115-.105.275-.155.485-.155.205 0 .36.045.465.135.095.09.145.22.145.395 0 .175-.055.31-.16.4-.11.09-.27.135-.48.135h-.25v.44h.25c.23 0 .405.045.525.145.12.095.185.245.185.45 0 .17-.06.31-.175.425-.13.125-.31.19-.535.19a.704.704 0 0 1-.495-.175c-.14-.125-.21-.305-.22-.535h-.595c.03.4.17.71.42.92.225.19.525.285.895.285Z",
    strokeWidth: 0.2,
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    strokeWidth: 0.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5.923 10.014h3"
  }))));
};

exports["default"] = SvgInputQuarterRange;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
