/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import { DateControlPlugin } from './InputDate.js';
import { i18n } from 'i18n-runtime';

var InputQuarterPlugin = /** @class */function (_super) {
  __extends(InputQuarterPlugin, _super);
  function InputQuarterPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-quarter';
    _this.$schema = '/schemas/QuarterControlSchema.json';
    // 组件名称
    _this.name = i18n("a483bccf85587055ab31314ad1d2f82a");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'input-quarter-plugin';
    _this.description = i18n("549a2a421951fc8c304c6223f346e024");
    _this.docLink = '/amis/zh-CN/components/form/input-quarter';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    // @ts-ignore
    _this.scaffold = {
      type: 'input-quarter',
      name: 'month'
    };
    _this.disabledRendererPlugin = true;
    _this.previewSchema = {
      type: 'form',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.panelTitle = 'Quarter';
    return _this;
  }
  InputQuarterPlugin.id = 'InputQuarterPlugin';
  return InputQuarterPlugin;
}(DateControlPlugin);
registerEditorPlugin(InputQuarterPlugin);

export { InputQuarterPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
