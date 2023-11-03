/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var HiddenControlPlugin = /** @class */function (_super) {
  __extends(HiddenControlPlugin, _super);
  function HiddenControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'hidden';
    _this.$schema = '/schemas/HiddenControlSchema.json';
    // 组件名称
    _this.name = i18n("d27d7b1542d91641d1d232c9f58b96d1");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-eye-slash';
    _this.pluginIcon = 'hidden-plugin';
    _this.description = i18n("d50b9a7291d45d1da8633439427afaef");
    _this.docLink = '/amis/zh-CN/components/form/hidden';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'hidden',
      name: 'var1'
    };
    _this.previewSchema = {
      type: 'tpl',
      tpl: i18n("d27d7b1542d91641d1d232c9f58b96d1")
    };
    _this.panelTitle = i18n("d27d7b1542d91641d1d232c9f58b96d1");
    _this.panelBody = [getSchemaTpl('layout:originPosition', {
      value: 'left-top'
    }), {
      type: 'input-text',
      name: 'value',
      label: i18n("225f3ed00750ae78ad1e6ea42c8f5087")
    }];
    return _this;
  }
  HiddenControlPlugin.prototype.renderRenderer = function (props) {
    return this.renderPlaceholder(i18n("4f6595b5030e171fcead42d321ba767f"), props.key, props.style);
  };
  HiddenControlPlugin.id = 'HiddenControlPlugin';
  return HiddenControlPlugin;
}(BasePlugin);
registerEditorPlugin(HiddenControlPlugin);

export { HiddenControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
