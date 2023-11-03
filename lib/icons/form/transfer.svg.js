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
var SvgTransfer = function SvgTransfer(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon"
  }, props), _g || (_g = /*#__PURE__*/React__namespace.createElement("g", {
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "currentColor"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M6 11.499V14H2V2h4v2.499M10 4.5V2h4v12h-4v-2.504M5 8h2"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    d: "M5.414 9.414 4 8l1.414-1.414M10.586 6.586 12 8l-1.414 1.414M9 8h2"
  }))));
};

exports["default"] = SvgTransfer;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
