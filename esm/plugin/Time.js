/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, tipedLabel, defaultValue, registerEditorPlugin } from 'amis-editor-core';
import { DatePlugin } from './Date.js';
import { i18n } from 'i18n-runtime';

var timeFormatOptions = [{
  label: 'HH:mm',
  value: 'HH:mm',
  timeFormat: 'HH:mm'
}, {
  label: 'HH:mm:ss',
  value: 'HH:mm:ss',
  timeFormat: 'HH:mm:ss'
}, {
  label: i18n("90696835bfa70d38b02ef5533d33c88d"),
  value: i18n("90696835bfa70d38b02ef5533d33c88d"),
  timeFormat: 'HH:mm'
}, {
  label: i18n("6154f88c0ac259ace41b0a5be45d753c"),
  value: i18n("6154f88c0ac259ace41b0a5be45d753c"),
  timeFormat: 'HH:mm:ss'
}];
// 暂仅提示时间戳，待input-time的timeFormat支持表达式后增加其他类型
var dateFormatOptions = [{
  label: i18n("79d7c8cd739a1f94c7bb30c74323eaa7"),
  value: 'X'
}];
var TimePlugin = /** @class */function (_super) {
  __extends(TimePlugin, _super);
  function TimePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'time';
    _this.name = i18n("7ac24322bc8eeac88db6823942423ac3");
    _this.isBaseComponent = true;
    _this.pluginIcon = 'time-plugin';
    _this.scaffold = {
      type: 'time',
      value: Math.round(Date.now() / 1000),
      format: 'HH:mm:ss'
    };
    _this.previewSchema = __assign(__assign({}, _this.scaffold), {
      format: 'HH:mm:ss',
      value: Math.round(Date.now() / 1000)
    });
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'input-time',
            name: 'value',
            inputFormat: 'HH:mm:ss',
            timeFormat: 'HH:mm:ss',
            label: i18n("0a72b3858efffaa1bab685fa840b701b")
          }, {
            type: 'input-text',
            name: 'format',
            label: tipedLabel(i18n("ecd1a3cadcf1d55250afafbbde767250"), i18n("fcb9b16d5d056bfbf6b6cba9dcf61efa")),
            clearable: true,
            options: timeFormatOptions,
            pipeIn: defaultValue('HH:mm:ss')
          }, {
            type: 'input-text',
            name: 'valueFormat',
            label: tipedLabel(i18n("db0258df1ddbd88749b335aecdc8425e"), i18n("fcb9b16d5d056bfbf6b6cba9dcf61efa")),
            clearable: true,
            options: dateFormatOptions,
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
  TimePlugin.id = 'TimePlugin';
  return TimePlugin;
}(DatePlugin);
registerEditorPlugin(TimePlugin);

export { TimePlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
