/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var InputDateRange = require('./InputDateRange.js');
var i18nRuntime = require('i18n-runtime');

var QuarterRangePlugin = /** @class */function (_super) {
  tslib.__extends(QuarterRangePlugin, _super);
  function QuarterRangePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-quarter-range';
    _this.$schema = '/schemas/MonthRangeControlSchema.json';
    // 组件名称
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'input-quarter-range-plugin';
    _this.name = i18nRuntime.i18n("39891e1760c79287985adece9a107fd6");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("5b4ad7ffa6eee985e72e002bf18ac09a");
    _this.docLink = '/amis/zh-CN/components/form/input-quarter-range';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-quarter-range',
      label: i18nRuntime.i18n("7866226eb814f681dcc4037e7489aab8"),
      name: 'quarter-range'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign({}, _this.scaffold)]
    };
    _this.disabledRendererPlugin = true;
    _this.notRenderFormZone = true;
    return _this;
  }
  QuarterRangePlugin.id = 'QuarterRangePlugin';
  return QuarterRangePlugin;
}(InputDateRange.DateRangeControlPlugin);
amisEditorCore.registerEditorPlugin(QuarterRangePlugin);

exports.QuarterRangePlugin = QuarterRangePlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
