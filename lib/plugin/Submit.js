/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var Button = require('./Button.js');
var i18nRuntime = require('i18n-runtime');

var SubmitPlugin = /** @class */function (_super) {
  tslib.__extends(SubmitPlugin, _super);
  function SubmitPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'submit';
    _this.disabledRendererPlugin = true; // 组件面板不显示
    // 组件名称
    _this.name = i18nRuntime.i18n("939d5345ad4345dbaabe14798f6ac0f1");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("74f0f6730053049f4c9beca2ab00c193");
    _this.panelTitle = i18nRuntime.i18n("fa966345577ba81af19408f203db968f");
    _this.scaffold = {
      type: 'submit',
      label: i18nRuntime.i18n("939d5345ad4345dbaabe14798f6ac0f1"),
      level: 'primary'
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    return _this;
  }
  SubmitPlugin.id = 'SubmitPlugin';
  return SubmitPlugin;
}(Button.ButtonPlugin);
amisEditorCore.registerEditorPlugin(SubmitPlugin);

exports.SubmitPlugin = SubmitPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
