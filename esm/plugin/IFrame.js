/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __spreadArray, __read } from 'tslib';
import { getSchemaTpl, tipedLabel, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var IFramePlugin = /** @class */function (_super) {
  __extends(IFramePlugin, _super);
  function IFramePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'iframe';
    _this.$schema = '/schemas/IFrameSchema.json';
    // 组件名称
    _this.name = 'iFrame';
    _this.isBaseComponent = true;
    _this.description = i18n("713315591970d7c8b49d1c732fe54fde");
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0")];
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
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('textareaFormulaControl', {
            name: 'src',
            mode: 'normal',
            label: i18n("8f1c078c6d42759e6ccb1a9bf35f1629")
          })]
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', __spreadArray([{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('style:widthHeight', {
            widthSchema: {
              label: tipedLabel(i18n("c28479019e24e0e4745f4948e9e97ee7"), i18n("51ad722113289f70b6d77c78ddf0c64a")),
              pipeIn: defaultValue('100%')
            },
            heightSchema: {
              label: tipedLabel(i18n("c1df04eec5fa0857bc0df2d68d8e953c"), i18n("c78d9b9ab9db5951eb5526e8a46677d9")),
              pipeIn: defaultValue('100%')
            }
          })]
        }], __read(getSchemaTpl('theme:common', {
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
}(BasePlugin);
registerEditorPlugin(IFramePlugin);

export { IFramePlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
