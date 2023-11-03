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

var LogPlugin = /** @class */function (_super) {
  tslib.__extends(LogPlugin, _super);
  function LogPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'log';
    _this.$schema = '/schemas/LogSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("456d29ef8bafd5202547e50d3e64d4ea");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-file-text-o';
    _this.pluginIcon = 'log-plugin';
    _this.description = i18nRuntime.i18n("d06f8476d115020496058363a32bc40b");
    _this.docLink = '/amis/zh-CN/components/log';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.previewSchema = {
      type: 'log',
      height: 120,
      autoScroll: true
    };
    _this.scaffold = {
      type: 'log',
      autoScroll: true,
      height: 500,
      encoding: 'utf-8'
    };
    _this.panelJustify = true;
    _this.panelTitle = i18nRuntime.i18n("456d29ef8bafd5202547e50d3e64d4ea");
    _this.panelBodyCreator = function (context) {
      context.info.renderer;
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('apiControl', {
            required: true,
            name: 'source',
            renderLabel: true,
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("c11322c9cc43ce3c004cf03f5ac0acd0"), i18nRuntime.i18n("fa0b9c20503ee00554e8c86d4a4461b6"))
          }), {
            type: 'input-text',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("1d3d7de6b84f4d5d4a4e126e145af132"), i18nRuntime.i18n("d55bbcd785be46c3182dcd7663c3c041")),
            name: 'encoding'
          }, amisEditorCore.getSchemaTpl('placeholder', {
            label: i18nRuntime.i18n("0021bd6b2290ddca1ad6a9c8848377bc"),
            placeholder: i18nRuntime.i18n("f013ea9dcba3f5ca1278aa850931fec8")
          }), {
            type: 'switch',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("d7eb1e98e6cfbe38ab3b242c4dda1b7b"), i18nRuntime.i18n("ab2dd531871defe1ef7d8d06548411f3")),
            name: 'autoScroll',
            value: true,
            inputClassName: 'is-inline'
          }, {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("2b6bc0f293f5ca01b006206c2535ccbc"), i18nRuntime.i18n("41058383885336fbe750665044e4e38a")),
            type: 'checkboxes',
            name: 'operation',
            inline: false,
            options: [{
              label: i18nRuntime.i18n("095e938e2a09eaddc8db146b86879f4a"),
              value: 'stop'
            }, {
              label: i18nRuntime.i18n("694fc5efa9e1d1c2c5eb6525e1c7fb29"),
              value: 'restart'
            }, {
              label: i18nRuntime.i18n("288f0c404c4e546aa3683ff5054e85e2"),
              value: 'clear'
            }, {
              label: i18nRuntime.i18n("0cee3cd1e0b0956fb3447d7188553e4b"),
              value: 'showLineNumber'
            }, {
              label: i18nRuntime.i18n("bee912d79eefb7335988c4997aa9138d"),
              value: 'filter'
            }]
          }]
        }, {
          title: i18nRuntime.i18n("c2f42bd2a149bbeb4627b1e1b5fabedb"),
          body: [{
            type: 'input-number',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("45f14d9548decc8a1df4e470efcf8d08"), i18nRuntime.i18n("ef744ba73b07d85f877fa8774f64da36")),
            name: 'rowHeight',
            min: 1
          }, {
            type: 'input-number',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("7a5d14c5f61745f08700ba315609cf9a"), i18nRuntime.i18n("686e0a9356c1cbbaff2ce3b98bf8439a")),
            name: 'maxLength',
            min: 1
          }]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: false
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'input-number',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("c1df04eec5fa0857bc0df2d68d8e953c"), i18nRuntime.i18n("bddc8f2d9bdcc083bb4f3dd38eaba459")),
            name: 'height',
            min: 1
          }]
        }, amisEditorCore.getSchemaTpl('style:classNames', {
          isFormItem: false
        })])
      }]);
    };
    return _this;
  }
  LogPlugin.id = 'LogPlugin';
  return LogPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(LogPlugin);

exports.LogPlugin = LogPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
