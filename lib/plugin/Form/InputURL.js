/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var InputText = require('./InputText.js');
var i18nRuntime = require('i18n-runtime');

var URLControlPlugin = /** @class */function (_super) {
  tslib.__extends(URLControlPlugin, _super);
  function URLControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-url';
    _this.$schema = '/schemas/TextControlSchema.json';
    _this.name = i18nRuntime.i18n("13604cddfe74bc9b9078dd61f9fb94ef");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-link';
    _this.pluginIcon = 'input-url-plugin';
    _this.description = i18nRuntime.i18n("ed2e16700e32afdcdd745aa31454edb9");
    _this.docLink = '/amis/zh-CN/components/form/input-url';
    _this.scaffold = {
      type: 'input-url',
      label: i18nRuntime.i18n("bfe68d5844f8e54602760e18f45954f7"),
      name: 'url'
    };
    _this.disabledRendererPlugin = true;
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: tslib.__assign({}, _this.scaffold)
    };
    _this.panelTitle = 'URL';
    return _this;
  }
  URLControlPlugin.id = 'URLControlPlugin';
  return URLControlPlugin;
}(InputText.TextControlPlugin);
amisEditorCore.registerEditorPlugin(URLControlPlugin);

exports.URLControlPlugin = URLControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
