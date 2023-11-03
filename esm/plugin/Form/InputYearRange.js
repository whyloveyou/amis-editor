/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import { DateRangeControlPlugin } from './InputDateRange.js';
import { i18n } from 'i18n-runtime';

var YearRangeControlPlugin = /** @class */function (_super) {
  __extends(YearRangeControlPlugin, _super);
  function YearRangeControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-year-range';
    _this.$schema = '/schemas/DateRangeControlSchema.json';
    // 组件名称
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'input-month-range-plugin';
    _this.name = i18n("7866226eb814f681dcc4037e7489aab8");
    _this.isBaseComponent = true;
    _this.description = i18n("32a750b4fd61f1cfe37cac7147f05b3c");
    _this.docLink = '/amis/zh-CN/components/form/year-range';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-year-range',
      label: i18n("7866226eb814f681dcc4037e7489aab8"),
      name: 'year-range'
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
  YearRangeControlPlugin.id = 'YearRangeControlPlugin';
  return YearRangeControlPlugin;
}(DateRangeControlPlugin);
registerEditorPlugin(YearRangeControlPlugin);

export { YearRangeControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
