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
var SvgSwitchContainer = function SvgSwitchContainer(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon"
  }, props), _path || (_path = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M0 265.143v713.143h1024V265.143H0zm987.429 676.571H36.57v-640H987.43v640zM54.857 228.571h914.286a18.286 18.286 0 0 0 0-36.571H54.857a18.286 18.286 0 0 0 0 36.571zm54.857-73.142h804.572a18.286 18.286 0 0 0 0-36.572H109.714a18.286 18.286 0 0 0 0 36.572zm54.857-73.143H859.43a18.286 18.286 0 0 0 0-36.572H164.57a18.286 18.286 0 0 0 0 36.572z"
  })));
};

exports["default"] = SvgSwitchContainer;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
