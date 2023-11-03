/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import { DateRangeControlPlugin } from './InputDateRange.js';
import { i18n } from 'i18n-runtime';

var TimeRangeControlPlugin = /** @class */function (_super) {
  __extends(TimeRangeControlPlugin, _super);
  function TimeRangeControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-time-range';
    _this.$schema = '/schemas/DateRangeControlSchema.json';
    // 组件名称
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'input-time-range-plugin';
    _this.name = i18n("7866226eb814f681dcc4037e7489aab8");
    _this.isBaseComponent = true;
    _this.description = i18n("c166d8f9804ecef74b3b74190599a7b8");
    _this.docLink = '/amis/zh-CN/components/form/time-range';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-time-range',
      label: i18n("7866226eb814f681dcc4037e7489aab8"),
      name: 'time-range'
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
  TimeRangeControlPlugin.id = 'TimeRangeControlPlugin';
  return TimeRangeControlPlugin;
}(DateRangeControlPlugin);
registerEditorPlugin(TimeRangeControlPlugin);

export { TimeRangeControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
