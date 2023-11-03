/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import { DateControlPlugin } from './InputDate.js';
import { i18n } from 'i18n-runtime';

var DateTimeControlPlugin = /** @class */function (_super) {
  __extends(DateTimeControlPlugin, _super);
  function DateTimeControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-datetime';
    _this.$schema = '/schemas/DateTimeControlSchema.json';
    // 组件名称
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'input-datetime-plugin';
    _this.name = i18n("0c3bf4fce50589b1073baf15f8a00d36");
    _this.description = i18n("59a81f21a829e24e9a765c4d6e509e68");
    _this.docLink = '/amis/zh-CN/components/form/input-datetime';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-datetime',
      label: i18n("0c3bf4fce50589b1073baf15f8a00d36"),
      name: 'datetime'
    };
    _this.disabledRendererPlugin = true;
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: [__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18n("0c3bf4fce50589b1073baf15f8a00d36");
    return _this;
  }
  DateTimeControlPlugin.id = 'DateTimeControlPlugin';
  return DateTimeControlPlugin;
}(DateControlPlugin);
registerEditorPlugin(DateTimeControlPlugin);

export { DateTimeControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
