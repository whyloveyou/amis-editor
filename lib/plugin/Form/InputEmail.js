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

var EmailControlPlugin = /** @class */function (_super) {
  tslib.__extends(EmailControlPlugin, _super);
  function EmailControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-email';
    _this.$schema = '/schemas/TextControlSchema.json';
    _this.name = i18nRuntime.i18n("ab37cc3baa3ec204bd7ebfa450568c40");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-envelope-o';
    _this.pluginIcon = 'input-email-plugin';
    _this.description = i18nRuntime.i18n("e3c0d799e8880a36edb07e34fd1bed67");
    _this.scaffold = {
      type: 'input-email',
      label: i18nRuntime.i18n("3bc5e602b2d4c7fffe79258e2ac6952e"),
      name: 'email'
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
  EmailControlPlugin.id = 'EmailControlPlugin';
  return EmailControlPlugin;
}(InputText.TextControlPlugin);
amisEditorCore.registerEditorPlugin(EmailControlPlugin);

exports.EmailControlPlugin = EmailControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
