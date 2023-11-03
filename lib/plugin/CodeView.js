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

var CodeViewPlugin = /** @class */function (_super) {
  tslib.__extends(CodeViewPlugin, _super);
  function CodeViewPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'code';
    _this.$schema = '/schemas/CodeSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("38bbd995a790f5a67211e034b007c145");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-code';
    _this.pluginIcon = 'code-plugin';
    _this.description = i18nRuntime.i18n("38bbd995a790f5a67211e034b007c145");
    _this.docLink = '/amis/zh-CN/components/code';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.scaffold = {
      type: 'code',
      language: 'html',
      value: '<div>html</div>'
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.panelTitle = i18nRuntime.i18n("38bbd995a790f5a67211e034b007c145");
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), {
          type: 'input-text',
          label: i18nRuntime.i18n("d7ec2d3fea4756bc1642e0f10c180cf5"),
          name: 'name'
        }, {
          type: 'editor',
          label: i18nRuntime.i18n("86e38e6425f722ba725718af2366ac08"),
          allowFullscreen: true,
          name: 'value'
        }]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('className')]
      }, {
        title: i18nRuntime.i18n("33bf801796fd255b5f6147e33146669b"),
        body: [amisEditorCore.getSchemaTpl('ref'), amisEditorCore.getSchemaTpl('visible')]
      }]);
    };
    return _this;
  }
  CodeViewPlugin.id = 'CodeViewPlugin';
  return CodeViewPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(CodeViewPlugin);

exports.CodeViewPlugin = CodeViewPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
