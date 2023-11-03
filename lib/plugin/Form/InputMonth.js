/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var InputDate = require('./InputDate.js');
var i18nRuntime = require('i18n-runtime');

var MonthControlPlugin = /** @class */function (_super) {
  tslib.__extends(MonthControlPlugin, _super);
  function MonthControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-month';
    _this.$schema = '/schemas/MonthControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("4ff1e74e43a3586339251494117185ad");
    _this.isBaseComponent = true;
    _this.pluginIcon = 'inputMonth-plugin';
    _this.icon = 'fa fa-calendar';
    _this.description = i18nRuntime.i18n("4f9c849b6b7f048cfd242cef3e707a58");
    _this.docLink = '/amis/zh-CN/components/form/input-month';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    // @ts-ignore
    _this.scaffold = {
      type: 'input-month',
      name: 'month'
    };
    _this.disabledRendererPlugin = true;
    _this.previewSchema = {
      type: 'form',
      wrapWithPanel: false,
      body: [tslib.__assign({}, _this.scaffold)]
    };
    _this.panelTitle = 'Month';
    return _this;
  }
  MonthControlPlugin.id = 'MonthControlPlugin';
  return MonthControlPlugin;
}(InputDate.DateControlPlugin);
amisEditorCore.registerEditorPlugin(MonthControlPlugin);

exports.MonthControlPlugin = MonthControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
