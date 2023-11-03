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

/**
 * @file 走势图
 */
var SparklinePlugin = /** @class */function (_super) {
  tslib.__extends(SparklinePlugin, _super);
  function SparklinePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'sparkline';
    _this.$schema = '/schemas/SparklineSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("29326bcd28fb39bd41e54242fa532c85");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("270301455c3de762a7e2b145dac7a8b4");
    _this.docLink = '/amis/zh-CN/components/sparkline';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-area-chart';
    _this.pluginIcon = 'sparkline-plugin';
    _this.scaffold = {
      type: 'sparkline',
      height: 30,
      value: [3, 5, 2, 4, 1, 8, 3, 7]
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.panelTitle = i18nRuntime.i18n("29326bcd28fb39bd41e54242fa532c85");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('name')]
        }, {
          title: i18nRuntime.i18n("00958a92c5804d56047c18fc206382e1"),
          body: [{
            name: 'width',
            type: 'input-number',
            label: i18nRuntime.i18n("c28479019e24e0e4745f4948e9e97ee7")
          }, {
            name: 'height',
            type: 'input-number',
            label: i18nRuntime.i18n("c1df04eec5fa0857bc0df2d68d8e953c")
          }]
        }, amisEditorCore.getSchemaTpl('status')])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([], tslib.__read(amisEditorCore.getSchemaTpl('theme:common', {
          exclude: ['layout']
        })), false))
      }])];
    };
    return _this;
  }
  SparklinePlugin.id = 'SparklinePlugin';
  return SparklinePlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(SparklinePlugin);

exports.SparklinePlugin = SparklinePlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
