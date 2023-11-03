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

var IFramePlugin = /** @class */function (_super) {
  tslib.__extends(IFramePlugin, _super);
  function IFramePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'iframe';
    _this.$schema = '/schemas/IFrameSchema.json';
    // 组件名称
    _this.name = 'iFrame';
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("713315591970d7c8b49d1c732fe54fde");
    _this.tags = [i18nRuntime.i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-window-maximize';
    _this.pluginIcon = 'iframe-plugin';
    _this.scaffold = {
      type: 'iframe',
      src: '//www.baidu.com'
    };
    _this.previewSchema = {
      type: 'tpl',
      tpl: 'iFrame'
    };
    _this.panelTitle = 'iFrame';
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('textareaFormulaControl', {
            name: 'src',
            mode: 'normal',
            label: i18nRuntime.i18n("8f1c078c6d42759e6ccb1a9bf35f1629")
          })]
        }, amisEditorCore.getSchemaTpl('status')])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('style:widthHeight', {
            widthSchema: {
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("c28479019e24e0e4745f4948e9e97ee7"), i18nRuntime.i18n("51ad722113289f70b6d77c78ddf0c64a")),
              pipeIn: amisEditorCore.defaultValue('100%')
            },
            heightSchema: {
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("c1df04eec5fa0857bc0df2d68d8e953c"), i18nRuntime.i18n("c78d9b9ab9db5951eb5526e8a46677d9")),
              pipeIn: amisEditorCore.defaultValue('100%')
            }
          })]
        }], tslib.__read(amisEditorCore.getSchemaTpl('theme:common', {
          exclude: ['layout']
        })), false))]
      }]);
    };
    return _this;
  }
  IFramePlugin.prototype.renderRenderer = function (props) {
    return this.renderPlaceholder("IFrame \u9875\u9762\uFF08".concat(props.src, "\uFF09"), props.key, props.style);
  };
  IFramePlugin.id = 'IFramePlugin';
  return IFramePlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(IFramePlugin);

exports.IFramePlugin = IFramePlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
