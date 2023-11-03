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
var SvgFormula = function SvgFormula(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon"
  }, props), _g || (_g = /*#__PURE__*/React__namespace.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M0 0h16v16H0z"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    stroke: "currentColor",
    strokeLinejoin: "round",
    d: "M2 2h12v12H2z"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    d: "M7.175 4.456c.434-.278 1.15-.227 1.492-.189.144.017.46.046.428.358-.025.25-.393.224-.491.224-.597 0-1.242-.306-1.589.952l-.162.79h.82c.15 0 .272.12.272.269 0 .149-.122.27-.273.27h-.935l-.736 3.58s-.07.574-.428.552a.38.38 0 0 1-.048-.006l.04-.013a.25.25 0 0 1-.098.02h-.996a.234.234 0 0 1-.234-.234v-.003a.25.25 0 0 1 .226-.249c.253-.024.474-.065.662-.121a.53.53 0 0 0 .258-.145l.698-3.381H4.973a.267.267 0 0 1-.224-.122l-.022-.043.01-.016c.016-.015.042-.028.052-.046-.015-.014-.066-.027-.066-.043v.095L4.72 6.95l-.015-.066c.012-.252.126-.293.268-.293H6.2l.17-.805c.121-.57.371-1.05.806-1.329Zm3.954 2.23c.084.044.128.096.133.154.005.058-.018.115-.07.172l-.985 1.058.972 1.32c.03.04.038.087.02.139-.015.052-.083.09-.174.138a.33.33 0 0 1-.246.03.307.307 0 0 1-.157-.116l-.82-1.074-.996 1.07c-.119.126-.253.145-.407.055a.576.576 0 0 1-.193-.234c-.013-.061.012-.125.075-.194l1.1-1.185-.801-1.05c-.033-.048-.037-.104-.01-.168.025-.064.084-.101.147-.139a.4.4 0 0 1 .236-.047c.063.004.119.039.17.104l.667.86.806-.87a.44.44 0 0 1 .226-.125c.075-.022.225.056.307.101Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    d: "M0 0h14.5A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5H0v-.5h14.5a1 1 0 0 0 1-1v-13a1 1 0 0 0-1-1H0V0Z"
  }))));
};

exports["default"] = SvgFormula;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
