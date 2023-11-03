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

var JsonPlugin = /** @class */function (_super) {
  tslib.__extends(JsonPlugin, _super);
  function JsonPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'json';
    _this.$schema = '/schemas/JsonSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("5acc93183b7fe3816a845aca52baeff2");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("5a4b81442789f3b2e7b665bd430eeabf");
    _this.docLink = '/amis/zh-CN/components/json';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-code';
    _this.pluginIcon = 'json-view-plugin';
    _this.scaffold = {
      type: 'json'
    };
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      name: 'json',
      value: {
        a: 1,
        b: {
          c: 2
        }
      }
    });
    _this.panelTitle = 'JSON';
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isUnderField = /\/field\/\w+$/.test(context.path);
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [isUnderField ? {
            type: 'tpl',
            inline: false,
            className: 'text-info text-sm',
            tpl: i18nRuntime.i18n("8e1fee898434093aad55f5888497f970")
          } : null, {
            name: 'levelExpand',
            type: 'input-number',
            label: i18nRuntime.i18n("f891291cbfaec7ba3754520e2a5227d8"),
            pipeIn: amisEditorCore.defaultValue(1)
          }]
        }, amisEditorCore.getSchemaTpl('status')])
      }, amisEditorCore.getSchemaTpl('onlyClassNameTab')])];
    };
    return _this;
  }
  JsonPlugin.id = 'JsonPlugin';
  return JsonPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(JsonPlugin);

exports.JsonPlugin = JsonPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
