/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __read, __assign } from 'tslib';
import React__default, { useEffect } from 'react';
import { Modal, Button } from 'amis';
import cx from 'classnames';
import FormulaEditor from 'amis-ui/lib/components/formula/Editor';
import { i18n } from 'i18n-runtime';

var FormulaPicker = function (props) {
  var variables = props.variables,
    variableMode = props.variableMode,
    _a = props.evalMode,
    evalMode = _a === void 0 ? true : _a;
  var _b = __read(React__default.useState(undefined), 2),
    formula = _b[0],
    setFormula = _b[1];
  useEffect(function () {
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
  return React__default.createElement(Modal, {
    className: cx('FormulaPicker-Modal'),
    size: "lg",
    show: true,
    onHide: handleClose,
    closeOnEsc: true
  }, React__default.createElement(Modal.Body, null, React__default.createElement(FormulaEditor, __assign({}, props, {
    header: props.header || i18n("a9400c408441f1f7f6d6954deb05ae9a"),
    variables: variables,
    variableMode: variableMode,
    value: formula,
    evalMode: evalMode,
    onChange: handleChange
  }))), React__default.createElement(Modal.Footer, null, React__default.createElement(Button, {
    onClick: handleClose
  }, i18n("625fb26b4b3340f7872b411f401e754c")), React__default.createElement(Button, {
    onClick: handleConfirm,
    level: "primary"
  }, i18n("e83a256e4f5bb4ff8b3d804b5473217a"))));
};

export { FormulaPicker as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
