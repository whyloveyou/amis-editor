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
var SvgUuid = function SvgUuid(props) {
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
    d: "M4.218 9.456c.376 0 .668-.096.876-.288.208-.196.312-.48.312-.852V6.544h-.468v1.78c0 .248-.06.428-.172.548-.116.116-.3.176-.548.176-.252 0-.436-.06-.548-.176-.116-.12-.172-.3-.172-.548v-1.78H3.03v1.772c0 .372.104.656.316.856.2.188.492.284.872.284Zm3.136 0c.376 0 .668-.096.876-.288.208-.196.312-.48.312-.852V6.544h-.468v1.78c0 .248-.06.428-.172.548-.116.116-.3.176-.548.176-.252 0-.436-.06-.548-.176-.116-.12-.172-.3-.172-.548v-1.78h-.468v1.772c0 .372.104.656.316.856.2.188.492.284.872.284ZM9.77 9.4V6.544h-.468V9.4h.468Zm1.804 0c.464 0 .812-.128 1.052-.384.228-.244.344-.592.344-1.044 0-.456-.116-.804-.344-1.044-.24-.256-.588-.384-1.052-.384H10.53V9.4h1.044Zm-.088-.4h-.488V6.944h.488c.356 0 .616.08.78.244.16.16.24.424.24.784 0 .352-.08.612-.24.78-.164.164-.424.248-.78.248Z",
    strokeWidth: 0.2,
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
};

exports["default"] = SvgUuid;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
