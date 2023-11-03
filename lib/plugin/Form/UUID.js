/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

var UUIDControlPlugin = /** @class */function (_super) {
  tslib.__extends(UUIDControlPlugin, _super);
  function UUIDControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'uuid';
    _this.$schema = '/schemas/UUIDControlSchema.json';
    // 组件名称
    _this.name = 'UUID';
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-eye-slash';
    _this.pluginIcon = 'uuid-plugin';
    _this.description = i18nRuntime.i18n("43474db97aff2ed0a876a47b6f4cdc7d");
    _this.docLink = '/amis/zh-CN/components/form/uuid';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'uuid',
      name: 'uuid'
    };
    _this.previewSchema = {
      type: 'form',
      wrapWithPanel: false,
      body: [tslib.__assign({}, _this.scaffold)]
    };
    _this.panelTitle = 'UUID';
    _this.panelBody = [amisEditorCore.getSchemaTpl('layout:originPosition', {
      value: 'left-top'
    }), {
      type: 'static',
      value: i18nRuntime.i18n("43e1548e15272e1007051d7c8b70adf6")
    }];
    return _this;
  }
  UUIDControlPlugin.prototype.renderRenderer = function (props) {
    return this.renderPlaceholder(i18nRuntime.i18n("844d72db7e57be4d77881ee9b4294e75"), props.key, props.style);
  };
  UUIDControlPlugin.id = 'UUIDControlPlugin';
  return UUIDControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(UUIDControlPlugin);

exports.UUIDControlPlugin = UUIDControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
