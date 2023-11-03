/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import { TextControlPlugin } from './InputText.js';
import { i18n } from 'i18n-runtime';

var PasswordControlPlugin = /** @class */function (_super) {
  __extends(PasswordControlPlugin, _super);
  function PasswordControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-password';
    _this.$schema = '/schemas/TextControlSchema.json';
    _this.name = i18n("5dd92ede50cc183f0f067dd29be5c325");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-asterisk';
    _this.pluginIcon = 'input-password-plugin';
    _this.description = i18n("e3c0d799e8880a36edb07e34fd1bed67");
    _this.scaffold = {
      type: 'input-password',
      label: i18n("a8105204604a0b11e916f3879aae3b0b"),
      name: 'password'
    };
    _this.disabledRendererPlugin = true;
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: __assign({}, _this.scaffold)
    };
    _this.panelTitle = _this.name;
    return _this;
  }
  PasswordControlPlugin.id = 'PasswordControlPlugin';
  return PasswordControlPlugin;
}(TextControlPlugin);
registerEditorPlugin(PasswordControlPlugin);

export { PasswordControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
