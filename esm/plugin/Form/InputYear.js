/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import { DateControlPlugin } from './InputDate.js';
import { i18n } from 'i18n-runtime';

var YearControlPlugin = /** @class */function (_super) {
  __extends(YearControlPlugin, _super);
  function YearControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-year';
    _this.$schema = '/schemas/YearControlSchema.json';
    // 组件名称
    _this.name = 'Year';
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'input-year-plugin';
    _this.description = i18n("b233766d3fae72574d3f9ee98c5be120");
    _this.docLink = '/amis/zh-CN/components/form/input-year';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    // @ts-ignore
    _this.scaffold = {
      type: 'input-year',
      name: 'year'
    };
    _this.disabledRendererPlugin = true;
    _this.previewSchema = {
      type: 'form',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.panelTitle = 'Year';
    return _this;
  }
  YearControlPlugin.id = 'YearControlPlugin';
  return YearControlPlugin;
}(DateControlPlugin);
registerEditorPlugin(YearControlPlugin);

export { YearControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
