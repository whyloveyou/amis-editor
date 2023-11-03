/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import { DateRangeControlPlugin } from './InputDateRange.js';
import { i18n } from 'i18n-runtime';

var MonthRangeControlPlugin = /** @class */function (_super) {
  __extends(MonthRangeControlPlugin, _super);
  function MonthRangeControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-month-range';
    _this.$schema = '/schemas/MonthRangeControlSchema.json';
    // 组件名称
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'input-month-range-plugin';
    _this.name = i18n("7c3885e3c3eca4d95521b3e220586628");
    _this.isBaseComponent = true;
    _this.description = i18n("5b4ad7ffa6eee985e72e002bf18ac09a");
    _this.docLink = '/amis/zh-CN/components/form/input-month-range';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-month-range',
      label: i18n("7866226eb814f681dcc4037e7489aab8"),
      name: 'month-range'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.disabledRendererPlugin = true;
    _this.notRenderFormZone = true;
    return _this;
  }
  MonthRangeControlPlugin.id = 'MonthRangeControlPlugin';
  return MonthRangeControlPlugin;
}(DateRangeControlPlugin);
registerEditorPlugin(MonthRangeControlPlugin);

export { MonthRangeControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
