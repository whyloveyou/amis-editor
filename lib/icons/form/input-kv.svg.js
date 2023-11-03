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
var SvgInputKv = function SvgInputKv(props) {
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
    d: "M2 2h12v12H2z"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    d: "M5.09 9.785v-1.23l.435-.425 1.41 1.655h.79L5.92 7.745l1.57-1.53h-.74L5.09 7.9V6.215h-.585v3.57h.585Zm5.135 0 1.27-3.57h-.635l-.98 2.91h-.015l-.98-2.91H8.25l1.27 3.57h.705Z",
    strokeWidth: 0.1,
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
};

exports["default"] = SvgInputKv;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
