/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

var inputStateTpl = function (className, path) {
  if (path === void 0) {
    path = '';
  }
  return tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([{
    type: 'select',
    name: 'editorState',
    label: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
    selectFirst: true,
    options: [{
      label: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
      value: 'default'
    }, {
      label: i18nRuntime.i18n("062d0b688adb10f3af5ebc2fd2667f1c"),
      value: 'hover'
    }, {
      label: i18nRuntime.i18n("4363c17ebb346b646af55bd8c8075915"),
      value: 'active'
    }]
  }], tslib.__read(inputStateFunc("${editorState == 'default' || !editorState}", 'default', className, path)), false), tslib.__read(inputStateFunc("${editorState == 'hover'}", 'hover', className, path)), false), tslib.__read(inputStateFunc("${editorState == 'active'}", 'active', className, path)), false);
};
var inputStateFunc = function (visibleOn, state, className, path, options) {
  if (options === void 0) {
    options = [];
  }
  return tslib.__spreadArray([amisEditorCore.getSchemaTpl('theme:font', {
    label: i18nRuntime.i18n("ca746b1ff10193a3ce20878dec04a733"),
    name: "".concat(className, ".font:").concat(state),
    visibleOn: visibleOn,
    editorThemePath: "".concat(path, ".").concat(state, ".body.font")
  }), amisEditorCore.getSchemaTpl('theme:colorPicker', {
    label: i18nRuntime.i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
    name: "".concat(className, ".background:").concat(state),
    labelMode: 'input',
    needGradient: true,
    needImage: true,
    visibleOn: visibleOn,
    editorThemePath: "".concat(path, ".").concat(state, ".body.bg-color")
  }), amisEditorCore.getSchemaTpl('theme:border', {
    name: "".concat(className, ".border:").concat(state),
    visibleOn: visibleOn,
    editorThemePath: "".concat(path, ".").concat(state, ".body.border")
  }), amisEditorCore.getSchemaTpl('theme:paddingAndMargin', {
    name: "".concat(className, ".padding-and-margin:").concat(state),
    visibleOn: visibleOn,
    editorThemePath: "".concat(path, ".").concat(state, ".body.padding-and-margin")
  }), amisEditorCore.getSchemaTpl('theme:radius', {
    name: "".concat(className, ".radius:").concat(state),
    visibleOn: visibleOn,
    editorThemePath: "".concat(path, ".").concat(state, ".body.border")
  })], tslib.__read(options), false);
};

exports.inputStateFunc = inputStateFunc;
exports.inputStateTpl = inputStateTpl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
