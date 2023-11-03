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

var FormulaControlPlugin = /** @class */function (_super) {
  tslib.__extends(FormulaControlPlugin, _super);
  function FormulaControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'formula';
    _this.$schema = '/schemas/FormulaControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("eb332076d766c2e817285f0a6d4860b9");
    _this.isBaseComponent = true;
    _this.disabledRendererPlugin = true;
    _this.icon = 'fa fa-calculator';
    _this.pluginIcon = 'formula-plugin';
    _this.description = i18nRuntime.i18n("000cf7353ce03857c671e89c91b35464");
    _this.docLink = '/amis/zh-CN/components/form/formula';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'formula',
      name: 'formula'
    };
    _this.previewSchema = {
      type: 'tpl',
      tpl: i18nRuntime.i18n("9da7578f9329ccaee1bbdf6a766744fd")
    };
    _this.panelTitle = i18nRuntime.i18n("eb332076d766c2e817285f0a6d4860b9");
    _this.panelBody = [amisEditorCore.getSchemaTpl('layout:originPosition', {
      value: 'left-top'
    }), {
      label: i18nRuntime.i18n("d314558953b3c76adb7e131aaec8bd86"),
      name: 'name',
      type: 'input-text',
      description: i18nRuntime.i18n("77562ec3db28683ec71612a11e6b39ef")
    }, {
      type: 'input-text',
      name: 'value',
      label: i18nRuntime.i18n("225f3ed00750ae78ad1e6ea42c8f5087")
    }, {
      type: 'input-text',
      name: 'formula',
      label: i18nRuntime.i18n("eb332076d766c2e817285f0a6d4860b9"),
      description: i18nRuntime.i18n("c80c42a0be1b39ed899b1f5560875cf8")
    }, {
      type: 'input-text',
      name: 'condition',
      label: i18nRuntime.i18n("89a8549c2ed7fc23a683599731d92b22"),
      description: i18nRuntime.i18n("8add6799ceff24eb041c5a6a92bb1694")
    }, amisEditorCore.getSchemaTpl('switch', {
      name: 'initSet',
      label: i18nRuntime.i18n("3df193f5d4f652a4bac331a69761041b"),
      description: i18nRuntime.i18n("86cebf86c66c6a4e6731b840c3967ab0"),
      pipeIn: amisEditorCore.defaultValue(true)
    }), amisEditorCore.getSchemaTpl('switch', {
      name: 'autoSet',
      label: i18nRuntime.i18n("aaff9b44fa3c84058d6bec9888b7b39f"),
      description: i18nRuntime.i18n("677568b4f6505bdd63387137bfcbf35a"),
      pipeIn: amisEditorCore.defaultValue(true)
    })];
    return _this;
  }
  FormulaControlPlugin.prototype.renderRenderer = function (props) {
    return this.renderPlaceholder(i18nRuntime.i18n("222c7bc60f06552b019d71bce57013ed"), props.key, props.style);
  };
  FormulaControlPlugin.id = 'FormulaControlPlugin';
  return FormulaControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(FormulaControlPlugin);

exports.FormulaControlPlugin = FormulaControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
