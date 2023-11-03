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

var TimeControlPlugin = /** @class */function (_super) {
  tslib.__extends(TimeControlPlugin, _super);
  function TimeControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-time';
    _this.$schema = '/schemas/TimeControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("82a61b32c76fba3dc83e2611624e93ec");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-clock-o';
    _this.pluginIcon = 'input-time-plugin';
    _this.description = i18nRuntime.i18n("c54993eb4c2a46263cca2e6bdebb051d");
    _this.docLink = '/amis/zh-CN/components/form/input-time';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-time',
      label: i18nRuntime.i18n("19fcb9eb2594059036dfede5f4ec53e8"),
      name: 'time'
    };
    _this.disabledRendererPlugin = true;
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: tslib.__assign({}, _this.scaffold)
    };
    _this.panelTitle = i18nRuntime.i18n("82a61b32c76fba3dc83e2611624e93ec");
    return _this;
  }
  TimeControlPlugin.id = 'TimeControlPlugin';
  return TimeControlPlugin;
}(InputDate.DateControlPlugin);
amisEditorCore.registerEditorPlugin(TimeControlPlugin);

exports.TimeControlPlugin = TimeControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
