/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var InputText = require('./InputText.js');
var i18nRuntime = require('i18n-runtime');

var PasswordControlPlugin = /** @class */function (_super) {
  tslib.__extends(PasswordControlPlugin, _super);
  function PasswordControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-password';
    _this.$schema = '/schemas/TextControlSchema.json';
    _this.name = i18nRuntime.i18n("5dd92ede50cc183f0f067dd29be5c325");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-asterisk';
    _this.pluginIcon = 'input-password-plugin';
    _this.description = i18nRuntime.i18n("e3c0d799e8880a36edb07e34fd1bed67");
    _this.scaffold = {
      type: 'input-password',
      label: i18nRuntime.i18n("a8105204604a0b11e916f3879aae3b0b"),
      name: 'password'
    };
    _this.disabledRendererPlugin = true;
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: tslib.__assign({}, _this.scaffold)
    };
    _this.panelTitle = _this.name;
    return _this;
  }
  PasswordControlPlugin.id = 'PasswordControlPlugin';
  return PasswordControlPlugin;
}(InputText.TextControlPlugin);
amisEditorCore.registerEditorPlugin(PasswordControlPlugin);

exports.PasswordControlPlugin = PasswordControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
