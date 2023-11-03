/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import { ButtonPlugin } from './Button.js';
import { i18n } from 'i18n-runtime';

var ResetPlugin = /** @class */function (_super) {
  __extends(ResetPlugin, _super);
  function ResetPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'reset';
    _this.disabledRendererPlugin = true; // 组件面板不显示
    // 组件名称
    _this.name = i18n("4b9c3271dc2f299dc3aeffb369187513");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-eraser';
    _this.description = i18n("d5e6d5c44426a82e18e31eadf7f1e09b");
    _this.panelTitle = i18n("fa966345577ba81af19408f203db968f");
    _this.scaffold = {
      type: 'reset',
      label: i18n("4b9c3271dc2f299dc3aeffb369187513")
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    return _this;
  }
  ResetPlugin.id = 'ResetPlugin';
  return ResetPlugin;
}(ButtonPlugin);
registerEditorPlugin(ResetPlugin);

export { ResetPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
