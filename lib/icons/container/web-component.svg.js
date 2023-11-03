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

var _path;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgWebComponent = function SvgWebComponent(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon"
  }, props), _path || (_path = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M9 2a1.5 1.5 0 0 1 1.493 1.356l.007.144H14v4a1.5 1.5 0 0 0 0 3V14h-3.5a1.5 1.5 0 0 0-3 0h-4v-3.5a1.5 1.5 0 0 1-.144-2.993L3.5 7.5v-4h4A1.5 1.5 0 0 1 9 2Z",
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinejoin: "round"
  })));
};

exports["default"] = SvgWebComponent;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
