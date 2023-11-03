/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amis = require('amis');
var cx = require('classnames');
var FormulaEditor = require('amis-ui/lib/components/formula/Editor');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var FormulaEditor__default = /*#__PURE__*/_interopDefaultLegacy(FormulaEditor);

var FormulaPicker = function (props) {
  var variables = props.variables,
    variableMode = props.variableMode,
    _a = props.evalMode,
    evalMode = _a === void 0 ? true : _a;
  var _b = tslib.__read(React__default["default"].useState(undefined), 2),
    formula = _b[0],
    setFormula = _b[1];
  React.useEffect(function () {
    var initable = props.initable,
      value = props.value;
    if (initable) {
      setFormula(value);
    }
  }, [props.value]);
  var handleChange = function (data) {
    setFormula(data);
  };
  var handleClose = function () {
    props.onClose && props.onClose();
  };
  var handleConfirm = function () {
    props.onConfirm && props.onConfirm(formula);
  };
  return React__default["default"].createElement(amis.Modal, {
    className: cx__default["default"]('FormulaPicker-Modal'),
    size: "lg",
    show: true,
    onHide: handleClose,
    closeOnEsc: true
  }, React__default["default"].createElement(amis.Modal.Body, null, React__default["default"].createElement(FormulaEditor__default["default"], tslib.__assign({}, props, {
    header: props.header || i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
    variables: variables,
    variableMode: variableMode,
    value: formula,
    evalMode: evalMode,
    onChange: handleChange
  }))), React__default["default"].createElement(amis.Modal.Footer, null, React__default["default"].createElement(amis.Button, {
    onClick: handleClose
  }, i18nRuntime.i18n("625fb26b4b3340f7872b411f401e754c")), React__default["default"].createElement(amis.Button, {
    onClick: handleConfirm,
    level: "primary"
  }, i18nRuntime.i18n("e83a256e4f5bb4ff8b3d804b5473217a"))));
};

exports["default"] = FormulaPicker;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
