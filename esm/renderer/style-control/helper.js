/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __spreadArray, __read } from 'tslib';
import { getSchemaTpl } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var inputStateTpl = function (className, path) {
  if (path === void 0) {
    path = '';
  }
  return __spreadArray(__spreadArray(__spreadArray([{
    type: 'select',
    name: 'editorState',
    label: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
    selectFirst: true,
    options: [{
      label: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
      value: 'default'
    }, {
      label: i18n("062d0b688adb10f3af5ebc2fd2667f1c"),
      value: 'hover'
    }, {
      label: i18n("4363c17ebb346b646af55bd8c8075915"),
      value: 'active'
    }]
  }], __read(inputStateFunc("${editorState == 'default' || !editorState}", 'default', className, path)), false), __read(inputStateFunc("${editorState == 'hover'}", 'hover', className, path)), false), __read(inputStateFunc("${editorState == 'active'}", 'active', className, path)), false);
};
var inputStateFunc = function (visibleOn, state, className, path, options) {
  if (options === void 0) {
    options = [];
  }
  return __spreadArray([getSchemaTpl('theme:font', {
    label: i18n("ca746b1ff10193a3ce20878dec04a733"),
    name: "".concat(className, ".font:").concat(state),
    visibleOn: visibleOn,
    editorThemePath: "".concat(path, ".").concat(state, ".body.font")
  }), getSchemaTpl('theme:colorPicker', {
    label: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
    name: "".concat(className, ".background:").concat(state),
    labelMode: 'input',
    needGradient: true,
    needImage: true,
    visibleOn: visibleOn,
    editorThemePath: "".concat(path, ".").concat(state, ".body.bg-color")
  }), getSchemaTpl('theme:border', {
    name: "".concat(className, ".border:").concat(state),
    visibleOn: visibleOn,
    editorThemePath: "".concat(path, ".").concat(state, ".body.border")
  }), getSchemaTpl('theme:paddingAndMargin', {
    name: "".concat(className, ".padding-and-margin:").concat(state),
    visibleOn: visibleOn,
    editorThemePath: "".concat(path, ".").concat(state, ".body.padding-and-margin")
  }), getSchemaTpl('theme:radius', {
    name: "".concat(className, ".radius:").concat(state),
    visibleOn: visibleOn,
    editorThemePath: "".concat(path, ".").concat(state, ".body.border")
  })], __read(options), false);
};

export { inputStateFunc, inputStateTpl };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
