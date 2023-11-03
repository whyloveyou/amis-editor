/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, tipedLabel, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var dateFormatOptions = [{
  label: i18n("79d7c8cd739a1f94c7bb30c74323eaa7"),
  value: 'X'
}, {
  label: i18n("84c7af622906c4e9d62bbf905d6ee517"),
  value: 'x'
}, {
  label: 'YYYY-MM-DD',
  value: 'YYYY-MM-DD'
}, {
  label: 'YYYY/MM/DD',
  value: 'YYYY/MM/DD'
}, {
  label: i18n("8935dbb864f032bacc618b0938887ad7"),
  value: i18n("8935dbb864f032bacc618b0938887ad7")
}];
var valueDateFormatOptions = [{
  label: i18n("79d7c8cd739a1f94c7bb30c74323eaa7"),
  value: 'X'
}];
var DatePlugin = /** @class */function (_super) {
  __extends(DatePlugin, _super);
  function DatePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'date';
    _this.$schema = '/schemas/DateSchema.json';
    // 组件名称
    _this.name = i18n("356b1959a9da95997b4de31415d9d74e");
    _this.isBaseComponent = true;
    _this.description = i18n("2bc6d101e5701a70f2fb9e0b67581594");
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'date-plugin';
    _this.scaffold = {
      type: 'date',
      value: Math.round(Date.now() / 1000)
    };
    _this.previewSchema = __assign(__assign({}, _this.scaffold), {
      format: 'YYYY-MM-DD',
      value: Math.round(Date.now() / 1000)
    });
    _this.panelTitle = i18n("356b1959a9da95997b4de31415d9d74e");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'input-date',
            name: 'value',
            label: i18n("7441768e25f67a80f0f2173c2a618c35")
          }, {
            type: 'input-text',
            name: 'format',
            label: tipedLabel(i18n("ecd1a3cadcf1d55250afafbbde767250"), i18n("fcb9b16d5d056bfbf6b6cba9dcf61efa")),
            clearable: true,
            options: dateFormatOptions,
            pipeIn: defaultValue('YYYY-MM-DD')
          }, {
            type: 'input-text',
            name: 'valueFormat',
            label: tipedLabel(i18n("db0258df1ddbd88749b335aecdc8425e"), i18n("fcb9b16d5d056bfbf6b6cba9dcf61efa")),
            clearable: true,
            options: valueDateFormatOptions,
            pipeIn: defaultValue('X')
          }, getSchemaTpl('placeholder', {
            pipeIn: defaultValue('-'),
            label: i18n("4c1cff4d8c05daa6ed9352a241ee628c")
          })]
        }, getSchemaTpl('status')])
      }, getSchemaTpl('onlyClassNameTab')])];
    };
    return _this;
  }
  DatePlugin.id = 'DatePlugin';
  DatePlugin.scene = ['layout'];
  return DatePlugin;
}(BasePlugin);
registerEditorPlugin(DatePlugin);

export { DatePlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
