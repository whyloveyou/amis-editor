/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var RepeatControlPlugin = /** @class */function (_super) {
  __extends(RepeatControlPlugin, _super);
  function RepeatControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-repeat';
    _this.$schema = '/schemas/RepeatControlSchema.json';
    // 组件名称
    _this.name = i18n("d38056d1c6aa9456f4b6b2c20aab06a2");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-repeat';
    _this.pluginIcon = 'input-repeat-plugin';
    _this.description = i18n("b3389af540d99fe9e51fb2995dbd6dff");
    _this.docLink = '/amis/zh-CN/components/form/input-repeat';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-repeat',
      label: i18n("2d842318fbd931286be387aaf5b2a7c3"),
      name: 'repeat'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18n("2d842318fbd931286be387aaf5b2a7c3");
    _this.panelBody = [getSchemaTpl('layout:originPosition', {
      value: 'left-top'
    }), getSchemaTpl('switchDefaultValue'), {
      type: 'input-text',
      name: 'value',
      label: i18n("225f3ed00750ae78ad1e6ea42c8f5087"),
      visibleOn: 'typeof this.value !== "undefined"'
    }, {
      name: 'options',
      type: 'select',
      label: i18n("a2d92b5adb07a4bf8a45e55643bc39f8"),
      options: 'secondly,minutely,hourly,daily,weekdays,weekly,monthly,yearly'.split(','),
      value: 'hourly,daily,weekly,monthly',
      multiple: true
    }];
    return _this;
  }
  RepeatControlPlugin.id = 'RepeatControlPlugin';
  return RepeatControlPlugin;
}(BasePlugin);
registerEditorPlugin(RepeatControlPlugin);

export { RepeatControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
