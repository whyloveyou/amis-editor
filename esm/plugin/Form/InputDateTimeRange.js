/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import { DateRangeControlPlugin } from './InputDateRange.js';
import { i18n } from 'i18n-runtime';

var DateTimeRangeControlPlugin = /** @class */function (_super) {
  __extends(DateTimeRangeControlPlugin, _super);
  function DateTimeRangeControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-datetime-range';
    _this.$schema = '/schemas/DateTimeRangeControlSchema.json';
    // 组件名称
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'input-date-range-plugin';
    _this.name = i18n("5eb8cb70e4dc97622c967d7c7efd6566");
    _this.isBaseComponent = true;
    _this.description = i18n("7f4466c0a16a1808b5ee398ce55997ab");
    _this.docLink = '/amis/zh-CN/components/form/input-datetime-range';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-datetime-range',
      label: i18n("7866226eb814f681dcc4037e7489aab8"),
      name: 'datetime-range'
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
  DateTimeRangeControlPlugin.id = 'DateTimeRangeControlPlugin';
  return DateTimeRangeControlPlugin;
}(DateRangeControlPlugin);
registerEditorPlugin(DateTimeRangeControlPlugin);

export { DateTimeRangeControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
