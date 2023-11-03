/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var Date$1 = require('./Date.js');
var i18nRuntime = require('i18n-runtime');

var dateFormatOptions = [{
  label: i18nRuntime.i18n("79d7c8cd739a1f94c7bb30c74323eaa7"),
  value: 'X'
}, {
  label: i18nRuntime.i18n("84c7af622906c4e9d62bbf905d6ee517"),
  value: 'x'
}, {
  label: 'YYYY-MM-DD HH:mm:ss',
  value: 'YYYY-MM-DD HH:mm:ss'
}, {
  label: 'YYYY/MM/DD HH:mm:ss',
  value: 'YYYY/MM/DD HH:mm:ss'
}, {
  label: i18nRuntime.i18n("3e253325914594e1dc483c0b64ea7643"),
  value: i18nRuntime.i18n("3e253325914594e1dc483c0b64ea7643")
}];
var valueDateFormatOptions = [{
  label: i18nRuntime.i18n("79d7c8cd739a1f94c7bb30c74323eaa7"),
  value: 'X'
}];
var DatetimePlugin = /** @class */function (_super) {
  tslib.__extends(DatetimePlugin, _super);
  function DatetimePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'datetime';
    _this.scaffold = {
      type: 'datetime',
      value: Math.round(Date.now() / 1000)
    };
    _this.name = i18nRuntime.i18n("b54e0f0a60f8e2c4c31f3b1ad7d5a613");
    _this.isBaseComponent = true;
    _this.pluginIcon = 'datetime-plugin';
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      format: 'YYYY-MM-DD HH:mm:ss',
      value: Math.round(Date.now() / 1000)
    });
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'input-datetime',
            name: 'value',
            label: i18nRuntime.i18n("8036cf5e8dbf62ee4f4e896f7354ce5c")
          }, {
            type: 'input-text',
            name: 'format',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("ecd1a3cadcf1d55250afafbbde767250"), i18nRuntime.i18n("fcb9b16d5d056bfbf6b6cba9dcf61efa")),
            clearable: true,
            options: dateFormatOptions,
            pipeIn: amisEditorCore.defaultValue('YYYY-MM-DD HH:mm:ss')
          }, {
            type: 'input-text',
            name: 'valueFormat',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("db0258df1ddbd88749b335aecdc8425e"), i18nRuntime.i18n("fcb9b16d5d056bfbf6b6cba9dcf61efa")),
            clearable: true,
            options: valueDateFormatOptions,
            pipeIn: amisEditorCore.defaultValue('X')
          }, amisEditorCore.getSchemaTpl('placeholder', {
            pipeIn: amisEditorCore.defaultValue('-'),
            label: i18nRuntime.i18n("4c1cff4d8c05daa6ed9352a241ee628c")
          })]
        }, amisEditorCore.getSchemaTpl('status')])
      }, amisEditorCore.getSchemaTpl('onlyClassNameTab')])];
    };
    return _this;
  }
  DatetimePlugin.id = 'DatetimePlugin';
  DatetimePlugin.scene = ['layout'];
  return DatetimePlugin;
}(Date$1.DatePlugin);
amisEditorCore.registerEditorPlugin(DatetimePlugin);

exports.DatetimePlugin = DatetimePlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
